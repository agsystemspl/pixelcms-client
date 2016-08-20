import browserHistory from 'react-router/lib/browserHistory'

import configureStore from '~/store/configureStore'
import locationChanged from '~/actions/route/locationChanged'

const initClient = (config, locale, reducers) => {
  const initialState = window.__INITIAL_STATE__
  const store = configureStore(config, locale, reducers, initialState)
  const location = browserHistory.getCurrentLocation()
  store.dispatch(
    locationChanged(
      location.pathname,
      location.query
    )
  )
  browserHistory.listen(location => {
    store.dispatch(
      locationChanged(
        location.pathname,
        location.query
      )
    )
  })
  return store
}

export default initClient
