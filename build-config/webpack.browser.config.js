module.exports = {
  entry: {
    index: './src/animate-vanilla-js.ts'
  },
  output: {
    filename: 'animate-vanilla-js-browser.js',
    libraryTarget: 'var',
    libraryExport: 'default',
    library: 'animateVanillaJs'
  }
}
