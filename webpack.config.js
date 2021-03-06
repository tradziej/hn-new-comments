const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = (env, argv) => {
  function resolvePath(toResolve) {
    return path.resolve(__dirname, toResolve);
  }

  const isProduction = argv.mode === 'production';
  const buildPath = resolvePath('dist/');
  const exclude = /(node_modules|dist)/;

  const plugins = isProduction ? [] : [new webpack.HotModuleReplacementPlugin()];

  return {
    devtool: isProduction ? 'hidden-source-map' : 'cheap-module-source-map',
    context: resolvePath('src'),
    entry: {
      content: path.join(__dirname, 'src', 'content', 'content.js'),
      background: path.join(__dirname, 'src', 'background', 'background.js'),
      options: path.join(__dirname, 'src', 'pages', 'options', 'options.js'),
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude,
          loader: 'eslint-loader',
          options: {
            fix: true,
            failOnError: isProduction,
          },
        },
        {
          exclude,
          test: /\.js$/,
          use: 'babel-loader',
        },
        {
          test: /\.(png)$/,
          use: ['file-loader'],
        },
      ],
    },
    output: {
      path: buildPath,
      filename: '[name].js',
    },
    plugins: [
      ...plugins,
      new webpack.DefinePlugin({
        IS_PRODUCTION: JSON.stringify(isProduction),
      }),
      new CopyWebpackPlugin([
        { from: 'manifest.json', to: 'manifest.json' },
        { from: 'img/icon16.png', to: 'img/icon16.png' },
        { from: 'img/icon48.png', to: 'img/icon48.png' },
        { from: 'img/icon128.png', to: 'img/icon128.png' },
        { from: 'pages/options/index.html', to: 'options' },
      ]),
    ],
    devServer: {
      contentBase: buildPath,
      host: '0.0.0.0',
      port: 4000,
      hot: true,
      writeToDisk: true,
      stats: 'minimal',
    },
  };
};

module.exports = config;
