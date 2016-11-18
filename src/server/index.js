import express from 'express'
import helmet from 'helmet'
import compression from 'compression'
import mustacheExpress from 'mustache-express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'

require('es6-promise').polyfill()
require('isomorphic-fetch')

const server = (webpackConfig, {
  ssrEnabled,
  forceHttps,
  trustSelfSignedCerts,
  port,
  configPath,
  localePath,
  reducersPath,
  AppPath
}) => {
  // allow self-signed certificates (always in dev)
  if (process.env.NODE_ENV !== 'production' || trustSelfSignedCerts) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
  }

  const app = express()
  app.set('trust proxy', true)
  if (process.env.NODE_ENV === 'production') {
    if (forceHttps) {
      app.use((req, res, next) => {
        if (!req.secure) {
          res.redirect('https://' + req.hostname + req.url)
        }
        else {
          next()
        }
      })
    }
    app.use(helmet())
  }
  app.use(compression())

  // (dev only)
  // clear cache when sources change
  // only modules required "below" this module are subject to clear
  if (process.env.NODE_ENV !== 'production') {
    const compiler = webpack(webpackConfig)

    app.use(webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath
    }))

    compiler.plugin('done', () => {
      let count = 0
      Object.keys(require.cache).forEach((id) => {
        if (!/\/node_modules\//.test(id) || /\/node_modules\/pixelcms-client\//.test(id)) {
          delete require.cache[id]
          count++
        }
      })
      console.log(`Clearing module cache: ${count} items removed`)
    })
  }

  // must come after webpack stuff
  app.use('/assets', express.static('build/assets'))
  app.use('/favicon.ico', express.static('build/favicon.ico'))

  app.engine('html', mustacheExpress())
  app.set('view engine', 'html')
  app.set('views', './build/templates')

  // request handler
  const serverRender = require('./serverRender').default
  app.get('*', (req, res) => {
    if (ssrEnabled) {
      serverRender(req, res, { configPath, localePath, reducersPath, AppPath }, data => {
        if (data.initialState.page.componentName === 'NotFound') {
          res.status(404)
        }
        else if (data.initialState.page.componentName === 'Error') {
          res.status(500)
        }
        res.render('index', {
          appRoot: data.appRoot,
          initialState: `<script>window.__INITIAL_STATE__ = ${JSON.stringify(data.initialState)}</script>`,
          meta: data.meta
        })
      })
    }
    else {
      if (process.env.NODE_ENV !== 'production') {
        console.log('SSR is disabled.')
      }
      res.render('index')
    }
  })

  app.listen(port, () => { console.log('Listening on port 3000...') })
}

export default server
