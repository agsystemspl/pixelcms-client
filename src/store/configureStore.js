import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import merge from 'lodash/merge'

import messages from '~/locale'
import * as pixelcmsReducers from '~/reducers'
import applyMiddlewareUniversal from '~/renderUniversal'

const getConfigReducer = (config) => (state = { ...config }) => {
  return state
}

const getLocaleReducer = (locale) => (state = merge({}, messages, locale)) => {
  return state
}

const configureStore = (config, locale, reducers, initialState = {}) => {
  const middleware = [thunkMiddleware]
  const applyProperMiddleware = __SERVER__ ? applyMiddlewareUniversal : applyMiddleware
  return createStore(
    combineReducers({
      config: getConfigReducer(config),
      locale: getLocaleReducer(locale),
      ...pixelcmsReducers,
      ...reducers
    }),
    initialState,
    compose(
      applyProperMiddleware(...middleware),
      /* global __SERVER__ */
      process.env.NODE_ENV !== 'production' && !__SERVER__ && window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  )
}

export default configureStore
