import apiRequest from '~/utils/apiRequest'
import cutLangPrefix from '~/utils/cutLangPrefix'
import t from '~/utils/i18n/t'

const requestPage = (location, resolve = f => f) => (dispatch, getState) => {
  dispatch({ type: 'REQUSTING_PAGE' })
  let pathname = cutLangPrefix(location.pathname, getState().config.langs)
  pathname += pathname !== '/' ? '/' : ''
  pathname += location.search
  const promise = apiRequest(
    dispatch, getState,
    `route${pathname}`
  )
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
        if (status === 401) {
          dispatch({
            type: 'RECEIVE_PAGE',
            page: {
              componentName: 'Redirect',
              componentData: { to: '/accounts/login' }
            }
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
      }
      resolve()
    })
  /* global __SERVER__ */
  /* global __PROMISES__ */
  if (__SERVER__) {
    __PROMISES__.push(promise)
  }
}

export default requestPage
