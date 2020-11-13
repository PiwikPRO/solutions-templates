/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const PnpWebpackPlugin = require('pnp-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const fs = require('fs');

const ROOT = path.resolve( __dirname, 'src' );
const DESTINATION = path.resolve( __dirname, 'dist' );

const entry = fs.readdirSync(path.join(__dirname, 'src'))
  .filter(filename => filename.includes('.'))
  .map(filename => filename.split('.'))
  .reduce((acc, next) => {
    acc[next[0]] = `./src/${next.join('.')}`

    return acc
  }, {})

module.exports = {
  mode: 'production',
  entry,
  output: {
    filename: '[name].js',
    path: DESTINATION
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(ts|tsx|jsx|js)$/,
            loader: require.resolve('ts-loader'),
          },
        ]
      }
    ]
  }
};
