module.exports = {
  entry: {
    index: './src/index.ts'
  },
  output: {
    filename: 'index.js',
    libraryTarget: 'umd',
    library: 'vanilla-js-animate',
    umdNamedDefine: true
  }
}
