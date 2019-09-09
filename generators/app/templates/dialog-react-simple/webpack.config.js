const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src/main.jsx'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.js',
    libraryTarget: 'commonjs2',
  },
  devtool: 'none', // prevent webpack from using eval() on my module
  externals: {
    application: 'application',
    assets: 'assets',
    clipboard: 'clipboard',
    cloud: 'cloud',
    commands: 'commands',
    scenegraph: 'scenegraph',
    uxp: 'uxp',
    viewport: 'viewport',
  },
  plugins: [
    new CopyWebpackPlugin([{ from: 'static', to: './', toType: 'dir' }], {
      debug: 'debug',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  node: 'current',
                },
                modules: 'commonjs',
              },
            ],
          ],
          plugins: ['@babel/transform-react-jsx'],
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
