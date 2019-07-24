const merge = require('webpack-merge')
const umdConfig = require('./build-config/webpack.umd.config')
const baseConfig = require('./build-config/webpack.base.config')
const demoConfig = require('./build-config/webpack.demo.config')
const browserConfig = require('./build-config/webpack.browser.config')

const TARGET = process.env.npm_lifecycle_event

if (TARGET === 'build') {
  module.exports = (env, argv) => [
    merge(baseConfig, umdConfig),
    merge(baseConfig, browserConfig),
    merge(baseConfig, demoConfig)
  ]
}

if (TARGET === 'serve') {
  module.exports = (env, argv) =>
    merge(baseConfig, demoConfig, {
      devtool: argv.mode === 'production' ? false : 'eval-source-map'
    })
}
