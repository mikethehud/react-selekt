var webpack = require('webpack');

/*
* Production Webpack config
*/

module.exports = {
  entry: "./src/react-selekt.js",
  output: {
    path: __dirname + "/dist/",
    filename: "react-selekt.js"
  },
  module: {
    loaders: [
      { test: /\.js?$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
};
