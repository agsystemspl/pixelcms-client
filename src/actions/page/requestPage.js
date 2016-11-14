import apiRequest from '~/utils/apiRequest'
import t from '~/utils/i18n/t'

const requestPage = () => (dispatch, getState) => {
  dispatch({ type: 'REQUSTING_PAGE' })
  let pathname = getState().route.pathWithoutLang
  pathname += pathname !== '/' ? '/' : ''
  pathname += getState().route.search
  return apiRequest(dispatch, getState, `route${pathname}`)
    .then(({ data, ok, status }) => {
      if (ok) {
        dispatch({
          type: 'RECEIVE_PAGE',
          page: {
            componentName: data.componentName,
            componentData: data.componentData
          }
        })
        dispatch({
          type: 'CHANGE_META',
          meta: data.meta
        })
      }
      else {
        dispatch({
          type: 'RECEIVE_PAGE',
          page: {
            componentName: status === 404 ? 'NotFound' : 'Error'
          }
        })
        dispatch({
          type: 'CHANGE_META',
          meta: {
            title: t(getState(), status === 404 ? 'Not found' : 'Error')
          }
        })
      }
    })
}

export default requestPage
