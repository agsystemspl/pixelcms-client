import apiRequest from '~/utils/apiRequest'

const requestModule = (moduleType, templateId, apiPath) => (dispatch, getState) => {
  dispatch({
    type: 'LOADING_MODULE',
    moduleType,
    templateId
  })
  const promise = apiRequest(dispatch, getState, apiPath)
    .then(({ data, ok, status }) => {
      if (ok) {
        dispatch({
          type: 'RECEIVE_MODULE',
          moduleType,
          templateId,
          data
        })
      }
      else {
        dispatch({
          type: 'RECEIVE_MODULE',
          moduleType,
          templateId,
          data: null
        })
      }
    })
  /* global __SERVER__ */
  /* global __PROMISES__ */
  if (__SERVER__) {
    __PROMISES__.push(promise)
  }
}

export default requestModule
