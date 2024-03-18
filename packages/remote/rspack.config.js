const path = require("node:path");
const {
  container: { ModuleFederationPlugin },
  HtmlRspackPlugin,
} = require("@rspack/core");

const workingDir = process.cwd();
const outDir = path.resolve(workingDir, "dist");

module.exports = {
  entry: "./src/index",
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
    publicPath: "http://localhost:3002/",
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
      name: "mf_remote",
      filename: "remoteEntry.js",
      remotes: {
        // NOTE: when this line is commented out, the user-context is not a remote, and just an imported
        // package, but for some reason this causes react sharing to break - sometimes it loads react once
        // sometimes twice. When it is loaded twice it breaks hooks and the app fails to load.
        // When this is uncommented, react sharing seems to consistently work as expected.
        // "@mf/user-context": "sidecarUserContext@http://localhost/remoteEntry-sidecarUserContext.js",
      },
      exposes: {
        ".": "./src/app",
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
