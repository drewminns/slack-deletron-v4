const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const dist = path.join(__dirname, 'dist')

module.exports = {
  entry: ['./client/index.tsx'],
  mode: 'development',
  output: {
    filename: '[name].[hash].js',
    publicPath: '/',
    path: dist,
  },
  devtool: 'eval',
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.scss$/i,
        exclude: /node_modules/,
        loader: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[name]__[local]',
              },
            },
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: ['./src/styles/_variables.scss', './src/styles/_queries.scss'],
            },
          },
        ],
      },
    ],
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html',
    }),
  ],
}
