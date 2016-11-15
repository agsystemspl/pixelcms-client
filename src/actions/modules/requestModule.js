import apiRequest from '~/utils/apiRequest'

const requestModule = (moduleType, templateId, apiPath) => (dispatch, getState, promises) => {
  dispatch({
    type: 'LOADING_MODULE',
    moduleType,
    templateId
  })
  promises.push(apiRequest(dispatch, getState, apiPath)
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
  )
}

export default requestModule
