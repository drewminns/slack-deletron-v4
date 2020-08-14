const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const dotenv = require('dotenv')
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default
const styledComponentsTransformer = createStyledComponentsTransformer({
  minify: true,
})

const dist = path.join(__dirname, 'dist')
const env = dotenv.config().parsed

module.exports = {
  entry: './src/index.tsx',
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
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader'],
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              getCustomTransformers: () => ({ before: [styledComponentsTransformer] }),
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'postcss-loader'],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    publicPath: '/',
    hot: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.svg'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.SENTRY_CONFIG': JSON.stringify(env.SENTRY_CONFIG),
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new FaviconsWebpackPlugin({
      logo: './src/assets/favicon.svg',
      lang: 'en-US',
      favicons: {
        appName: 'Slack Deletron',
        appDescription: 'Manage and Delete Slack files from your team.',
        developerName: 'Drew Minns',
        developerURL: 'https://drewminns.com', // prevent retrieving from the nearest package.json
        background: '#fff',
        theme_color: '#000',
        icons: {
          coast: false,
          yandex: false,
          windows: false,
          appleStartup: false,
        },
      },
    }),
  ],
}
