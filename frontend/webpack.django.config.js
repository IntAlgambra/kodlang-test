const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: './js/main.js',
  output: {
    filename: 'static/frontend/[name].js',
    path: path.resolve(__dirname, '../kodlang/frontend'),
    publicPath: '/',
  },
  devServer: {
    clientLogLevel: 'silent',
    stats: 'minimal',
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html',
      filename: 'templates/frontend/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'static/frontend/[name].css',
    }),
    new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ['!*.py'],
        cleanAfterEveryBuildPatterns: ['!*.py'],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: ['html-loader'],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            esModule: false,
            name: 'static/frontend/[name].[ext]'
          },
        }],
      },
    ],
  },
};
