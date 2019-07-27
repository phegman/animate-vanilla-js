module.exports = {
  entry: {
    index: './src/index.ts'
  },
  output: {
    filename: 'animate-vanilla-js-umd.js',
    libraryTarget: 'umd',
    library: 'animate-vanilla-js',
    umdNamedDefine: true
  }
}
