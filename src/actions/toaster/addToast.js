import removeToast from './removeToast'

const types = ['info', 'success', 'error', 'warning']

const addToast = (type, title, message, { timeout, icon } = {}) => (dispatch, getState) => {
  if (types.indexOf(type) === -1) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(`Wrong toast \`type: ${type}\`. Allowed types are: ${types}.`)
    }
    return
  }
  const timestamp = new Date().getTime()
  dispatch({
    type: 'ADD_TOAST',
    timestamp,
    toast: {
      type,
      icon,
      title,
      message
    }
  })
  if (typeof timeout === 'undefined') { timeout = 5000 }
  if (timeout) {
    setTimeout(() => dispatch(removeToast(timestamp)), timeout)
  }
}

export default addToast
