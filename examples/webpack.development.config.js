var webpack = require('webpack');

/*
* Development Webpack config
*/

module.exports = {
  devtool: "eval",
  entry:  [
    "webpack-dev-server/client?http://localhost:3456",
    "webpack/hot/only-dev-server",
    "./examples/main.js"
  ],
  // Temporary file for development
  output: {
    path: __dirname,
    filename: "bundle.js",
    publicPath: "http://localhost:9090"
  },
  // Hot loading
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    loaders: [
      // Load js via babel-loader and react-hot-loader
      { test: /\.js?$/, exclude: /node_modules/, loaders: ["react-hot-loader/webpack", "babel-loader"]}
    ]
  },
  // Transform files
  resolve: {
    extensions: ['.js', '.jsx']
  }
}
