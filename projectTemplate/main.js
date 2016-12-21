'use strict'

global.__SERVER__ = true
global.__CLIENT__ = false
if (process.env.NODE_ENV !== 'production') {
  global.__API_ROOT__ = 'http://localhost:8000/api/'
  global.__ADMIN_ROOT__ = 'http://localhost:8000/admin/'
}
else {
  global.__API_ROOT__ = ''
  global.__ADMIN_ROOT__ = ''
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
          configPath: path.resolve(__dirname, 'src/config'),
          localePath: path.resolve(__dirname, 'src/locale'),
          reducersPath: path.resolve(__dirname, 'src/reducers'),
          routesPath: path.resolve(__dirname, 'src/routes'),
          AppPath: path.resolve(__dirname, 'src/components/App')
        }
      )
    }
  )
