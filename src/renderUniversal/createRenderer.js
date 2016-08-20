/**
 * Creates a universal render function.
 *
 * By interacting with the passed promise watcher and the store it ensures that
 * the rendering reiteratively continues until no further actions are dispatched
 * and all current promises are resolved.
 *
 * The inner workings of the repetitive rendering require that each watched
 * promise also dispatches an action when it is resolved or rejected. Using it
 * together with a middleware that handles promises from synchronous action
 * creators is encouraged.
 */
export default (getPromises) => {
  return (renderFn, element) => {
    return new Promise((resolve, reject) => {
      let seenPromises = []
      let output = ''

      const render = () => {
        try {
          // Invoke the actual render function (e.g. ReactDOM.renderToString).
          output = renderFn(element)
          const activePromises = getPromises()

          const [newPromises] = activePromises
            .filter(([ promise ]) => seenPromises.indexOf(promise) === -1)
            .reduce(([ promiseA, actionA ], [ promiseB, actionB ]) => ([
              promiseA.concat(promiseB),
              actionA.concat(actionB)
            ]), [[], []])

          seenPromises = seenPromises.concat(newPromises)

          if (!activePromises.length) {
            resolve({ output })
          }
          else {
            // If any promises are left, re-render once the first promise has
            // been either resolved or rejected.
            Promise.race(activePromises.map(([ promise ]) => promise)).then(render, render)
          }
        }
        catch (error) {
          reject({ output, error })
        }
      }

      render()
    })
  }
}
