module.exports = {
  entry: {
    index: './src/index.ts'
  },
  output: {
    filename: 'index.js',
    libraryTarget: 'umd',
    library: 'animate-vanilla-js',
    umdNamedDefine: true
  }
}
