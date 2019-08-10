import webpack from "webpack";
import { getWebpackConfig } from "./webpack";
import { getConfig, getFileDirectory } from "../config/config";
import { args } from "../args/args";
import path from "path";

export const watchTs = () => {
  const config = getConfig();
  const configDir = getFileDirectory(args.configuration);
  const mode = "development";
  const outputPath = path.join(configDir, config.client.js.spec.output);
  const compiler = webpack(getWebpackConfig(mode, outputPath));

  compiler.watch(
    {
      aggregateTimeout: 300,
      poll: undefined
    },
    (err, stats) => {
      if (err) console.log(err.message);
      console.log(
        stats.toString({
          chunks: false,
          colors: true
        })
      );
    }
  );
};

export const webpackProdBuild = () => {
  const config = getConfig();
  const configDir = getFileDirectory(args.configuration);
  const mode = "production";
  const outputPath = path.join(
    configDir,
    "release",
    config.client.js.spec.output
  );
  const compiler = webpack(getWebpackConfig(mode, outputPath));

  compiler.run((err, stats) => {
    if (err) console.log(err.message);
    console.log(
      stats.toString({
        chunks: false,
        colors: true
      })
    );
  });
};
