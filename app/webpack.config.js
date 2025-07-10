import path from 'path';

import { fileURLToPath } from 'url';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: './src/main.js',

  output: {
    filename: 'bundle.[contenthash].js',
    path: path.join(__dirname, 'dist'),
    clean: true,
    publicPath: '/browser-extension-manager/'
  },

  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['autoprefixer']
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          sources: false
        }
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: '404.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'main.[contenthash].css'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets'),
          to: 'assets',
          noErrorOnMissing: true
        }
      ]
    })
  ],

  devServer: {
    static: './dist',
    port: 3000,
    open: true,
    hot: true,
    liveReload: true,
    watchFiles: ['./src/**/*']
  },

  resolve: {
    extensions: ['.js']
  },

  mode: 'development'
};
