import queryString from 'query-string'

import ApiRequest from '~/utils/ApiRequest'
import t from '~/utils/i18n/t'

const requestPage = () => (dispatch, getState) => {
  dispatch({ type: 'LOADING_PAGE' })
  const route = getState().route
  const query = queryString.stringify(route.query)
  const path = route.path + ((route.path !== '/') ? '/' : '') + (query ? '?' + query : '')
  return new ApiRequest().get('route' + path, dispatch, getState)
    .then(
      (res) => {
        dispatch({
          type: 'RECEIVE_PAGE',
          page: {
            componentName: res.body.componentName,
            componentData: res.body.componentData
          }
        })
        dispatch({
          type: 'CHANGE_META',
          meta: res.body.meta
        })
      },
      (res) => {
        dispatch({
          type: 'RECEIVE_PAGE',
          page: {
            componentName: (res.notFound) ? 'NotFound' : 'Error'
          }
        })
        dispatch({
          type: 'CHANGE_META',
          meta: {
            title: t(getState(), (res.notFound) ? 'Not found' : 'Error')
          }
        })
      }
    )
}

export default requestPage
