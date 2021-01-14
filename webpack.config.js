const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
    new HtmlWebpackPlugin({
      template: 'src/index.pug',
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
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
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader'
      },
      {
        test: /\.s[ac]ss$|\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader, 
            options: {
                publicPath: ''
            }
          },
          "css-loader",
          "resolve-url-loader",
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)$/, // Регуряркой указаны все расширения, которые используются
        include: [
          path.resolve(__dirname, 'src/assets/fonts'),    // include - будет брать только из данных каталогов
        ],
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/fonts',
          },
        },
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/,
        exclude: [path.resolve(__dirname, 'src/assets/fonts')], // exclude не разрешает смотреть в каталог шрифтов
        use: {                                           // требуется это, так как svg есть в шрифтах и картинках
          loader: 'file-loader',                         // и необходимо файлы шрифтов класть в один каталог, а
          options: {                                     // изображений в другой.
            name: '[name].[ext]',
            outputPath: 'assets/images',
            // publicPath: '/assets/images', // publicPath - может понадобится в финале разработки, но на первых 
          },                                 // порах его можно не использовать.
        },
      },
    ],
  },
};