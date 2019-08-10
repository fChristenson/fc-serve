import path from "path";
import { args } from "../args/args";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import { getConfig, getFileDirectory } from "../config/config";

export const getWebpackConfig = (
  mode: "development" | "production",
  outputPath: string
): webpack.Configuration => {
  const config = getConfig();
  const configDir = getFileDirectory(args.configuration);
  return {
    entry: path.join(configDir, config.client.js.spec.entry),
    output: {
      path: outputPath,
      filename: config.client.js.spec.filename
    },
    mode,
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"]
    },
    module: {
      rules: [
        {
          test: /\.tsx?/,
          include: /public/,
          exclude: /node_modules/,
          loader: "ts-loader"
        },
        {
          test: /\.jsx?/,
          include: /public/,
          exclude: /node_modules/,
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(configDir, config.client.html.spec.template)
      })
    ]
  };
};
