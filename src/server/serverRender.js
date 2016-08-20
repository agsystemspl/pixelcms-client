import { renderToString } from 'react-dom/server'
import createMemoryHistory from 'react-router/lib/createMemoryHistory'
import match from 'react-router/lib/match'
import DocumentMeta from 'react-document-meta'

import configureStore from '~/store/configureStore'
import locationChanged from '~/actions/route/locationChanged'
import setSsrCookie from '~/actions/auth/setSsrCookie'
import ApiRequest from '~/utils/ApiRequest'

const serverRender = (req, config, locale, reducers, getRoutes, cb) => {
  const store = configureStore(config, locale, reducers)
  store.dispatch(locationChanged(req.path, req.query))
  store.dispatch(setSsrCookie(req.get('cookie')))
  new ApiRequest().get('accounts/auth-info/', store.dispatch, store.getState)
    .then()
    .then(() => {
      const history = createMemoryHistory(req.originalUrl)
      const routes = getRoutes(store, history)
      match({ routes, location: req.originalUrl }, (err, redirectLocation, renderProps) => {
        if (err) { console.log(err) }
        else {
          var returnData = (data) => {
            var state = store.getState()
            if (state.route.serverRedirect) {
              cb(null, state.route.serverRedirect, null)
            }
            else {
              var meta = DocumentMeta.renderAsHTML()
              cb(null, null, {
                appRoot: data.output,
                initialState: state,
                meta: meta
              })
            }
          }
          store.renderUniversal(renderToString, routes)
            .then(
              (data) => {
                returnData(data)
              },
              (data) => {
                console.warn(data.error.message)
                returnData(data)
              }
            )
        }
      })
    })
}

export default serverRender
