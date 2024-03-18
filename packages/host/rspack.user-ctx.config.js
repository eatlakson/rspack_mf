const path = require("node:path");
const {
  container: { ModuleFederationPlugin },
} = require("@rspack/core");

const workingDir = process.cwd();
const outDir = path.resolve(workingDir, "dist");
const ASSET_PATH = process.env.ASSET_PATH || "/";

module.exports = {
  entry: {
    main: {
      import: "./src/dummy",
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
    uniqueName: "sidecarUserContext",
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
      name: "sidecarUserContext",
      filename: "remoteEntry-sidecarUserContext.js",
      remotes: {},
      exposes: {
        ".": require.resolve("@mf/user-context"),
      },
      shared: {
        react: {
          singleton: true,
        },
        "react-dom": {
          singleton: true,
        },
      },
      runtimePlugins: [],
    }),
  ],
};
