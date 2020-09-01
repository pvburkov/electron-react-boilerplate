const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Any directories you will be adding code/files into, need to be added to this array so webpack will pick them up
const defaultInclude = path.resolve(__dirname, 'src');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/, // loader CSS
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ],
        include: defaultInclude
      },
      {
        test: /\.jsx?$/, // loader for react
        use: [{
          loader: 'babel-loader'
        }],
        include: defaultInclude
      },
      {
        test: /\.(jpe?g|png|gif)$/, // loader for images
        use: [{ loader: 'file-loader?name=img/[name]__[hash:base64:5].[ext]' }],
        include: defaultInclude
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/, // loader for custom fonts
        use: [{ loader: 'file-loader?name=font/[name]__[hash:base64:5].[ext]' }],
        include: defaultInclude
      }
    ]
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/components')
    },
    extensions: ['.js', '.jsx', '.css'],
    modules: [defaultInclude, 'node_modules']
  },
  target: 'electron-renderer',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'bundle.css'
    })
  ],
  stats: {
    colors: true,
    children: false,
    chunks: false,
    modules: false
  }
};