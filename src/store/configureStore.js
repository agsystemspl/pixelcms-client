import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import merge from 'lodash/merge'

import pixelcmsLocale from '~/locale'
import * as pixelcmsReducers from '~/reducers'

/* global __CLIENT__ */
const configureStore = (config, locale, reducers) => {
  return createStore(
    combineReducers({
      config: (state = { ...config }) => { return state },
      locale: (state = merge({}, pixelcmsLocale, locale)) => { return state },
      ...pixelcmsReducers,
      ...reducers
    }),
    __CLIENT__ ? window.__INITIAL_STATE__ : {},
    compose(
      applyMiddleware(
        thunkMiddleware
      ),
      process.env.NODE_ENV !== 'production' && __CLIENT__ && window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  )
}

export default configureStore
