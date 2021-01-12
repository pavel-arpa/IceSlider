const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
console.log(path)


// ==========================================================================================

module.exports = {
  mode: 'development',
  entry: ["@babel/polyfill", "./src/index.ts"],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },

  // DEV SERVER ============================================
  devServer: {
    // contentBase: path.join(__dirname, 'dist'),
  },


  // PLUGINS ===========================================
  plugins: [
    new CleanWebpackPlugin(),
  ],


  // MODULES ===========================================
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-typescript'
            ]
          }
        }
      }
    ],
  },
};