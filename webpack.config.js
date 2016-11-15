var path = require('path');

module.exports = {
    entry: {
      main: './src/main.js'
    },
    externals:
    {
      "fs": "require('fs')",
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'main.js'
    },
    module: {
      loaders: [
          {
            loader: 'babel',
            exclude: /node_modules/,
            query: {
              presets: ['es2015'],
            }
          }
      ]
    }
};
