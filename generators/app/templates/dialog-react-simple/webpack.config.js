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
    clipboard: 'clipboard',
    commands: 'commands',
    scenegraph: 'scenegraph',
    uxp: 'uxp',
  },
  plugins: [
    new CopyWebpackPlugin([{ from: 'static', to: './', toType: 'dir' }], { debug: 'debug' }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
          ],
          plugins: [
            ['@babel/plugin-transform-modules-commonjs'],
            [
              '@babel/plugin-transform-runtime',
              {
                // Plugin ReferenceError: regeneratorRuntime is not defined
                regenerator: true,
              },
            ],
            '@babel/transform-react-jsx',
          ],
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
