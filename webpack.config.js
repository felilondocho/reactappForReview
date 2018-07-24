const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
var path = require('path');
const webpack = require('webpack');

const jsRule = {
  test: /\.js$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  options: {
    plugins: [
      ['import', { libraryName: "antd", style: true }]
    ]
  },
};

const htmlRule = {
  test: /\.html$/,
  use: {
    loader: "html-loader"
  }
};

const imageRule = {
  test: /\.(png|svg|jpg|gif)$/,
  use: [
    'file-loader'
  ]
};

const cssRule = {
  test: /\.css$/,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        modules: true,
        localIdentName: '[name]__[local]__[hash:base64:5]',
      },
    },
    'postcss-loader',
  ]
};

const scssRule = {
  test: /\.scss$/,
  use: [
    // MiniCssExtractPlugin.loader,
    "style-loader",
    {
      loader: "css-loader",
      options: {
        modules: true,
        sourceMap: true,
        importLoader: 2,
        localIdentName: '[name]__[local]__[hash:base64:5]',
      }
    },
    "sass-loader",
  ]
};

const lessRule = {
  test: /\.less$/,
  use : [
    {loader: 'style-loader'},
    {loader: 'css-loader'},
    {
      loader: 'less-loader',
      options: {
        javascriptEnabled: true,
      }
    }
  ]
};

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [jsRule, htmlRule, imageRule, cssRule, scssRule, lessRule]
  },
  watch: true,
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html",
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: "styles.css",
      chunkFilename: "[name].css"
    }),
  ]
}
