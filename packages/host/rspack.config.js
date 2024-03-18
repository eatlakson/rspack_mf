const path = require("node:path");
const { HtmlRspackPlugin } = require("@rspack/core");
const {
  container: { ModuleFederationPlugin, ModuleFederationPluginV1 },
} = require("@rspack/core");

const workingDir = process.cwd();
const outDir = path.resolve(workingDir, "dist");
const ASSET_PATH = process.env.ASSET_PATH || "/";

module.exports = {
  entry: {
    main: {
      import: "./src/async-entry",
    },
  },
  mode: "development",
  devtool: false,
  resolve: {
    extensions: [".jsx", ".js", ".json", ".mjs"],
  },
  optimization: {
    minimize: false,
  },
  output: {
    path: outDir,
    publicPath: ASSET_PATH,
    filename: "[name]-[contenthash].js",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: "builtin:swc-loader",
          options: {
            jsc: {
              parser: {
                syntax: "ecmascript",
                jsx: true,
              },
            },
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.md$/,
        type: "asset/source",
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "host",
      filename: "remoteEntry.js",
      remotes: {
        "@mf/user-context": "sidecarUserContext@http://localhost/remoteEntry-sidecarUserContext.js",
        "@mf/remote": "mf_remote@http://localhost:3002/remoteEntry.js",
      },
      shared: {
        react: {
          singleton: true,
        },
        "react-dom": {
          singleton: true,
        },
      },
    }),
    new HtmlRspackPlugin({
      template: "./public/index.ejs",
      chunks: ["main"],
    }),
  ],
};
