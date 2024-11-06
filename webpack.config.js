/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const fs = require('fs');

const ROOT = path.resolve( __dirname, 'src' );
const DESTINATION = path.resolve( __dirname, 'build' );

function readDirectoryContents(dirPath){

  const output = fs.readdirSync(path.join(__dirname, dirPath))
    .filter(filename => filename.includes('.'))
    .map(filename => filename.split('.'))
    .reduce((acc, next) => {
      acc[next[0]] = `./`+dirPath+`/${next.join('.')}`;

      return acc;
    }, {});

  return output;  

}

const src = readDirectoryContents('src');
const minified = readDirectoryContents('src/helpers/minified');

const entry = {
  ...src,
  ...minified
};


module.exports = {
  mode: 'production',
  entry,
  output: {
    filename: '[name].js',
    library: '[name]',
    libraryExport: 'default',
    path: DESTINATION,
  },
  target: 'es5',
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