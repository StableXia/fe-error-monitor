const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, './lib'),
    filename: 'index.js',
  },
  mode: 'production',
  devtool: 'source-map',
  devServer: {
    port: 9527,
  },
};
