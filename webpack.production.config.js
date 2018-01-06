var webpack = require('webpack');

/*
* Production Webpack config
*/

module.exports = {
  entry: "./src/react-selekt.js",
  output: {
    library: 'ReactSelekt',
    libraryTarget: 'umd',
    path: __dirname + "/dist/",
    filename: "react-selekt.js"
  },
  externals: [
    {
      "react": {
        root: "React",
        commonjs2: "react",
        commonjs: "react",
        amd: "react"
      }
    }
  ],
  module: {
    loaders: [
      { test: /\.js?$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
