const webpack = require("webpack");
const path = require("path");
const fs = require("fs");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
// const CompressionPlugin = require('compression-webpack-plugin');
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;

const pages = fs
  .readdirSync(path.resolve(__dirname, "src/templates/pages"))
  .filter(fileName => fileName.endsWith(".pug"));

module.exports = (env, options) => ({
  entry: {
    main: "./src/index.js",
    theming: "./src/js/theming.js"
  },
  output: {
    publicPath: "",
    path: path.resolve(__dirname, "dist"),
    filename: "assets/js/[name].js"
  },
  // devtool: "source-map",
  // devServer: {
  //   static: "./dev",
  //   port: 3000
  // },
  module: {
    rules: [
      {
        test: /\.pug$/,
        include: path.resolve(__dirname, "src/templates"),
        use: [
          {
            loader: "pug-loader",
            options: {
              pretty: true
            }
          }
        ]
      },
      {
        test: /\.(scss|css)$/,
        include: path.resolve(__dirname, "src/sass"),
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../../"
            }
          },
          {
            loader: "css-loader"
          },
          {
            loader: "postcss-loader"
          },
          {
            loader: "resolve-url-loader"
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              sassOptions: {
                outputStyle: "expanded"
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        include: /theme-images/,
        type: "asset/resource",
        generator: {
          filename: "assets/images/[name][ext]"
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        include: /content-images/,
        type: "asset/resource",
        generator: {
          filename: "assets/content-images/[name][ext]"
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[name][ext]"
        }
      },
      {
        test: /\.vue$/,
        include: path.resolve(__dirname, "src/js/cart-vue"),
        loader: "vue-loader"
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components|vendor)/,
        include: path.resolve(__dirname, "src"),
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  },
  plugins: [
    options.mode === "development" ? false : new CleanWebpackPlugin(),
    // new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "assets/css/[name].css"
    }),
    new VueLoaderPlugin(),
    ...pages.map(
      page =>
        new HtmlWebpackPlugin({
          template: "./src/templates/pages/" + page,
          chunks: ["main", "theming"],
          filename: page.replace(/\.pug/, ".html"),
          minify: false
        })
    ),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/templates/pages/cart-vue.pug"),
      chunks: ["main", "theming", "cart"],
      filename: "cart-vue.html",
      minify: false
    }),
    // new webpack.ProvidePlugin({
    //   // $: "jquery",
    //   // jQuery: "jquery",
    //   // "window.jQuery": "jquery",
    // }),
    new ImageminPlugin({
      bail: false, // Ignore errors on corrupted images
      cache: true,
      imageminOptions: {
        pngquant: {
          quality: "95-100"
        }
      }
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "src/js/vendor/*.js",
          to: "assets/js/vendor/[name].js"
        },
        {
          from: "src/js/cart-vue/cart-data/*js",
          to: "assets/js/cart-data/[name].js"
        },
        {
          from: "src/sass/vendor/*.css",
          to: "assets/css/vendor/[name].css"
        },
        {
          from: "src/images/content-images/*.jpg",
          to: "assets/content-images/[name].jpg"
        }
      ]
    })
  ].filter(n => n)
  //   optimization: {
  //     minimizer: [
  //         new UglifyJsPlugin({
  //             cache: true,
  //             parallel: true,
  //             sourceMap: false,
  //             extractComments: false
  //         }),
  //         new CompressionPlugin({
  //             test: /\.js$|\.css(\?.*)?$/i
  //         }),
  //         new OptimizeCSSAssetsPlugin({})
  //     ]
  //   }
});
