const path = require('path');

module.exports = {
  entry: ['./src/index.js'],
  output: {
    filename: 'pixelDrawer.min.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'pixelDrawer',
    libraryTarget:'umd'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  }
};