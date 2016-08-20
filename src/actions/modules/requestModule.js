import ApiRequest from '~/utils/ApiRequest'

const requestModule = (moduleType, templateId, apiPath) => (dispatch, getState) => {
  dispatch({
    type: 'LOADING_MODULE',
    moduleType,
    templateId
  })
  return new ApiRequest().get(apiPath, dispatch, getState)
    .then(
      (res) => dispatch({
        type: 'RECEIVE_MODULE',
        moduleType,
        templateId,
        data: res.body
      }),
      () => dispatch({
        type: 'RECEIVE_MODULE',
        moduleType,
        templateId,
        data: null
      })
    )
}

export default requestModule
