module.exports = {
  entry: {
    index: './src/index.ts'
  },
  output: {
    filename: 'browser.js',
    libraryTarget: 'window',
    library: 'vanillaJsAnimate'
  }
}
