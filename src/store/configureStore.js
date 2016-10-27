import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import merge from 'lodash/merge'

import pixelcmsLocale from '~/locale'
import * as pixelcmsReducers from '~/reducers'
import applyMiddlewareUniversal from '~/renderUniversal'

/* global __SERVER__ */
/* global __CLIENT__ */
const configureStore = (config, locale, reducers) => {
  const middleware = [thunkMiddleware]
  const applyProperMiddleware = __SERVER__ ? applyMiddlewareUniversal : applyMiddleware
  const initialState = __CLIENT__ ? window.__INITIAL_STATE__ : {}
  return createStore(
    combineReducers({
      config: (state = { ...config }) => { return state },
      locale: (state = merge({}, pixelcmsLocale, locale)) => { return state },
      ...pixelcmsReducers,
      ...reducers
    }),
    initialState,
    compose(
      applyProperMiddleware(...middleware),
      process.env.NODE_ENV !== 'production' && !__SERVER__ && window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  )
}

export default configureStore
