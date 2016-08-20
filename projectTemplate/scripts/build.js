'use strict'

var webpack = require('webpack')

webpack(process.env.NODE_ENV === 'production' ? require('../webpack.config.prod') : require('../webpack.config.dev')).run(
  function(err, stats) {
    if (err) { console.log(err) }
  }
)
