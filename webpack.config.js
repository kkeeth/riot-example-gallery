
const path = require('path')
const webpack = require('webpack')
const { registerPreprocessor } = require('@riotjs/compiler')
const sass = require('node-sass')

registerPreprocessor('css', 'sass', (code, { options }) => {
  // const { file } = options
  const {css} = sass.renderSync({
    data: code
  })

  return {
    code: css.toString(),
    map: null
  }
})

module.exports = {
  entry: {
    app: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'bundle.js',
    chunkFilename: 'chunks/[name]/index.[chunkhash].js',
    devtoolModuleFilenameTemplate: 'source-webpack:///[resourcePath]',
    devtoolFallbackModuleFilenameTemplate: 'source-webpack:///[resourcePath]?[hash]'
  },
  devtool: '#source-map',
  devServer: {
    open: true,
    historyApiFallback: {
      index: 'index.html'
    }
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 6,
      maxInitialRequests: 4,
      automaticNameDelimiter: '~',
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.riot$/,
        exclude: /node_modules/,
        use: [{
          loader: '@riotjs/webpack-loader',
          options: {
            hot: true,
            css: 'sass'
          }
        }]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          "style-loader",
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: true
            }
          }
        ]
      }
    ]
  }
}