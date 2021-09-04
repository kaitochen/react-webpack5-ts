const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const webpackDevClientEntry = require.resolve(
  "react-dev-utils/webpackHotDevClient"
);
const reactRefreshOverlayEntry = require.resolve(
  "react-dev-utils/refreshOverlayInterop"
);
module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devtool: "cheap-source-map",
  devServer: {
    static: "./dist",
    client: {
      webSocketURL: {
        hostname: "0.0.0.0",
        pathname: "/ws",
        password: "dev-server",
        port: 8080,
        protocol: "ws",
        username: "webpack",
      },
    },
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: /src/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env", "@babel/preset-react"],
            plugins: [require.resolve("react-refresh/babel")],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  plugins: [
    new ReactRefreshWebpackPlugin({
      overlay: {
        entry: webpackDevClientEntry,
        module: reactRefreshOverlayEntry,
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new WebpackManifestPlugin({
      fileName: "asset-manifest.json",
    }),
  ],
};
