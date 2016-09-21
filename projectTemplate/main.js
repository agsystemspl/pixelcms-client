'use strict'

global.__SERVER__ = true
global.__CLIENT__ = false

require('babel-register')({
  presets: ['react', 'es2015', 'stage-0']
})
require.extensions['.scss'] = function() { return }

var WebpackIsomorphicTools = require('webpack-isomorphic-tools')

global.webpack_isomorphic_tools = new WebpackIsomorphicTools(
  require('./webpack-isomorphic-tools-configuration'))
    .development(process.env.NODE_ENV !== 'production')
    .server(__dirname, function() {
      require('pixelcms-client/lib/server').default(
        process.env.NODE_ENV === 'production' ? require('./webpack.config.prod') : require('./webpack.config.dev'),
        {
          ssrEnabled: true,
          trustSelfSignedCerts: true,
          port: 3000
        }
      )
    }
  )
