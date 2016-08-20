import express from 'express'
import compression from 'compression'
import mustacheExpress from 'mustache-express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'

const server = (webpackConfig, config, locale, reducers, getRoutes, { ssrEnabled, trustSelfSignedCerts, port }) => {
  // allow self-signed certificates
  if (process.env.NODE_ENV !== 'production' || trustSelfSignedCerts) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
  }

  const app = express()
  app.use(compression())

  // update server cache when sources change in development
  if (process.env.NODE_ENV !== 'production') {
    const compiler = webpack(webpackConfig)

    app.use(webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath
    }))

    compiler.plugin('done', () => {
      console.log('Clearing module cache on server.')
      Object.keys(require.cache).forEach((id) => {
        if (!/\/node_modules\//.test(id) || /\/node_modules\/pixelcms-client\//.test(id)) {
          console.log('* ' + id)
          delete require.cache[id]
        }
      })
    })
  }

  // must come after webpack stuff
  app.use('/assets', express.static('build/assets'))
  app.use('/favicon.ico', express.static('build/favicon.ico'))

  app.engine('html', mustacheExpress())
  app.set('view engine', 'html')
  app.set('views', './build/templates')

  // request handler
  app.get('*', (req, res) => {
    if (ssrEnabled) {
      require('./serverRender').default(req, config, locale, reducers, getRoutes, (err, redirect, data) => {
        if (err) { console.log(err) }
        if (redirect) { res.redirect(302, redirect) }
        else {
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
        }
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
