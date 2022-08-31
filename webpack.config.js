const path = require("path");
const HtmlWebpack = require("html-webpack-plugin");
const MiniCssExtract = require("mini-css-extract-plugin");
// const HtmlWebpackLiveReload = require("html-webpack-live-reload-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
// const { extendDefaultPlugins } = require("svgo");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  // entry: "./src/index.js",
  // entry: { main: ["./src/index.js", "./src/js/boosjs.js"] },
  // entry: { main: "./src/index.js", main2: "./src/js/boosjs.js" },
  // devtool: "eval-source-map",
  // entry: {
  //   index: "./src/index.js",
  //   component1: "./src/component1.js",
  // },

  output: {
    filename: "main.js",
    // filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),

    // aponta diretório asset
    assetModuleFilename: "assets/[name]-[hash][ext][query]",
    clean: true,
  },
  // devServer: {
  //   static: path.resolve(__dirname, "dist"),
  //   port: 8080,
  //   hot: true,
  // },

  //   devtool: false; teste
  //   devtool: false,
  module: {
    rules: [
      {
        test: /\.(sa|c|sc)ss$/i,
        use: [MiniCssExtract.loader, "css-loader", "sass-loader"],
      },

      // {
      //   test: /\.css$/i,
      //   use: ["style-loader", "css-loader"],
      // },

      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      //   {
      //     test: /\.(png|jp(e*)g|svg)$/,
      //     dependency: { not: ["url"] },
      //     use: [
      //       {
      //         loader: "url-loader",
      //         options: {
      //           limit: 8192,
      //         },
      //       },
      //     ],
      //     type: "javascript/auto",
      //   },
      // file-loader
      // {
      //   test: /\.(jpeg|jpg|png|svg|gif)$/i,
      //   use: {
      //     loader: "file-loader",
      //     options: {
      //       name: "[name].[ext]",
      //     },
      //   },
      // },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      //image file loader
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: "asset/resource",
      },

      //imagem novo amtigo
      // {
      //   test: /\.(jpe?g|png|gif|svg)$/i,

      //   type: "asset/resource",

      //   dependency: { not: ["url"] },
      //   use: [
      //     {
      //       loader: ImageMinimizerPlugin.loader,
      //       // enforce: "pre",
      //       options: {
      //         minimizer: {
      //           implementation: ImageMinimizerPlugin.imageminMinify,
      //           options: {
      //             plugins: [
      //               "imagemin-gifsicle",
      //               "imagemin-mozjpeg",
      //               "imagemin-pngquant",
      //               "imagemin-svgo",
      //             ],
      //           },
      //         },
      //       },
      //     },
      //   ],
      // },
      // imagem novo novo
    ],
  },

  plugins: [
    // new webpack.SourceMapDevToolPlugin({}),
    new HtmlWebpack({
      template: "./src/index.html",
      filename: "index.html",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),

    new MiniCssExtract({
      filename: "style.css",
    }),
    new ImageMinimizerPlugin({
      minimizer: {
        implementation: ImageMinimizerPlugin.imageminMinify,
        options: {
          plugins: [
            "imagemin-gifsicle",
            "imagemin-mozjpeg",
            "imagemin-pngquant",
            "svgo",
          ],
        },
      },
      // Disable `loader`
      // loader: false,
    }),
    // new webpack.ProvidePlugin({
    //   $: "jquery",
    //   jQuery: "jquery",
    // }),
  ],
};
