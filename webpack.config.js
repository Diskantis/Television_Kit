const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';

const filename = (ext, path='') => devMode ? `${path}[name]${ext}` : `${path}[name].[contenthash]${ext}`;


module.exports = {
  entry: {
    main: [path.resolve(__dirname, 'src/pages/main/index.js')],
  },
  output: {
    filename: filename('.js'),
    path: path.resolve(__dirname, 'public'),
    clean: true,
  },
  devServer: {
    port: 3000,
    open: true,
    hot: true,
  },
  resolve: {
    extensions: ['.js', '.json', '.png',],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/pages/main/index.html'),
      inject: 'body'
    }),
    new MiniCssExtractPlugin({
      filename: filename('.css'),
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|ico|webp|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: filename('[ext]', 'assets/icon/')
        }
      },
    ]
  }
}