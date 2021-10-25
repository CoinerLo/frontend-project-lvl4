/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const mode = process.env.NODE_ENV || 'development';

module.exports = {
  mode,
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    path: path.join(__dirname, 'dist', 'public'),
    publicPath: '/assets/',
  },
  devtool: 'inline-source-map',
  devServer: {
    compress: true,
    port: 8080,
    host: '0.0.0.0',
    historyApiFallback: true,
    open: true,
    static: {
      publicPath: '/assets/',
    },
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
    new Dotenv(),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(ttf|jpe?g|eot|svg)(\?[\s\S]+)?$/,
        type: 'asset/inline',
      },
    ],
  },
};
