module.exports = {
  entry: {
    index: './src/animate-vanilla-js.ts'
  },
  output: {
    filename: 'animate-vanilla-js-umd.js',
    libraryTarget: 'umd',
    library: 'animate-vanilla-js'
  }
}
