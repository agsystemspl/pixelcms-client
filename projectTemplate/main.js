'use strict'

global.__SERVER__ = true
global.__CLIENT__ = false
if (process.env.NODE_ENV !== 'production') {
  global.__API_ROOT__ = 'http://localhost:8000/api/'
}
else {
  global.__API_ROOT__ = 'http://backend.domain.com/api/'
}

require('babel-register')({
  presets: ['react', 'es2015', 'stage-0'],
  sourceRoot: process.cwd()
})
require.extensions['.scss'] = function() { return }

var path = require('path')
var WebpackIsomorphicTools = require('webpack-isomorphic-tools')

global.webpack_isomorphic_tools = new WebpackIsomorphicTools(
  require('./webpack-isomorphic-tools-configuration'))
    .server(__dirname, function() {
      require('pixelcms-client/lib/server').default(
        process.env.NODE_ENV === 'production' ? require('./webpack.config.prod') : require('./webpack.config.dev'),
        {
          ssrEnabled: true,
          trustSelfSignedCerts: true,
          port: 3000,
          configPath: path.resolve(__dirname, 'src/config'),
          localePath: path.resolve(__dirname, 'src/locale'),
          reducersPath: path.resolve(__dirname, 'src/reducers'),
          AppPath: path.resolve(__dirname, 'src/components/App')
        }
      )
    }
  )
