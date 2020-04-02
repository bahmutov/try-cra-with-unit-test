const path = require('path')
const findYarnWorkspaceRoot = require('find-yarn-workspace-root')
const webpack = require('@cypress/webpack-preprocessor')

const webpackConfigPath = path.resolve(
  findYarnWorkspaceRoot() || process.cwd(),
  'node_modules',
  'react-scripts',
  'config',
  'webpack.config.js'
)

console.log('path to react-scripts own webpack.config.js: %s', webpackConfigPath)

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'

const webpackFactory = require(webpackConfigPath)
const webpackOptions = webpackFactory('development')
// console.log(webpackOptions)

// remove bunch of options, we just need to bundle spec files
// delete webpackOptions.entry
// delete webpackOptions.output
// delete webpackOptions.node
delete webpackOptions.optimization

// console.log('cleaned up')
// console.log(webpackOptions)

module.exports = (on) => {

  const options = {
    webpackOptions,
    watchOptions: {},
  }

  on('file:preprocessor', webpack(options))
}
