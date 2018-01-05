var express = require('express');
var app = express();

var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var config = require('./webpack.development.config.js');

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

var devServer = new webpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    noInfo: true,
    historyApiFallback: true
  }
);

devServer.listen(3456, 'localhost', function (err, result) {
  if(err) console.log('Error > ', err);
})

var server = app.listen(8080, function () {
  console.log('React Selekt Example available at http://localhost:3456')
})
