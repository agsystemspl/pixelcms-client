import express from 'express'
import compression from 'compression'
import mustacheExpress from 'mustache-express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'

const server = (webpackConfig, {
  ssrEnabled,
  trustSelfSignedCerts,
  port,
  config,
  locale,
  reducers,
  App
}) => {
  // allow self-signed certificates (always in dev)
  if (process.env.NODE_ENV !== 'production' || trustSelfSignedCerts) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
  }

  const app = express()
  app.use(compression())

  // update server cache when sources change (dev only)
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
      serverRender(req, res, { config, locale, reducers, App }, data => {
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
        console.log('Server side rendering is disabled.')
      }
      res.render('index')
    }
  })

  app.listen(port, () => { console.log('Listening on port 3000...') })
}

export default server
