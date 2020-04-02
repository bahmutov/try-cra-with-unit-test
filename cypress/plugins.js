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
delete webpackOptions.plugins

console.log('cleaned up')
// console.log(JSON.stringify(webpackOptions, null, 2))
// eslint-loader
// console.log(webpackOptions.module.rules)
if (webpackOptions.module && Array.isArray(webpackOptions.module.rules)) {
  const modulePre = webpackOptions.module.rules.find(rule => rule.enforce === 'pre')
  if (modulePre && Array.isArray(modulePre.use)) {
    const useEslintLoader = modulePre.use.find(use => use.loader && use.loader.includes('eslint-loader'))
    if (useEslintLoader) {
      console.log('found useEslintLoader')
      console.log(useEslintLoader)
      if (useEslintLoader.options) {
        if (Array.isArray(useEslintLoader.options.globals)) {
          useEslintLoader.options.globals.push('cy')
        } else {
          useEslintLoader.options.globals = ['cy']
        }
      }
    }
  }
  // webpackOptions.module.rules[1].use[0].options.globals = ['cy']
}

module.exports = (on) => {

  const options = {
    webpackOptions,
    watchOptions: {},
  }

  on('file:preprocessor', webpack(options))
}
