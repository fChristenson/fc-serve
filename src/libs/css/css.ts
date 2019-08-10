import chokidar from "chokidar";
import path from "path";
import { getConfig, getFileDirectory } from "../config/config";
import { args } from "../args/args";
import postcss from "postcss";
//@ts-ignore
import postcssImport from "postcss-import";
import fs from "fs";

let numSyntaxErrors = 0;

export const watchCss = async () => {
  const config = getConfig();
  const configDir = getFileDirectory(args.configuration);
  const cssPath = path.resolve(configDir, config.client.css.spec.entry);
  const outPath = path.resolve(
    configDir,
    config.client.css.spec.output,
    config.client.css.spec.filename
  );

  await updateCss(cssPath, outPath);

  const watcher = chokidar.watch(cssPath, {
    awaitWriteFinish: {
      stabilityThreshold: 50,
      pollInterval: 10
    }
  });

  watcher
    .on("ready", () => console.log(`Watching ${config.client.css.spec.entry}`))
    .on("change", async () => {
      await updateCss(cssPath, outPath);
    });
};

export const cssPostBuild = async () => {
  const config = getConfig();
  const configDir = getFileDirectory(args.configuration);
  const cssPath = path.join(configDir, config.client.css.spec.entry);
  fs.mkdirSync(path.join(configDir, "release", config.client.css.spec.output), {
    recursive: true
  });
  const outPath = path.join(
    configDir,
    "release",
    config.client.css.spec.output,
    config.client.css.spec.filename
  );

  await updateCss(cssPath, outPath);
};

const updateCss = async (cssPath: string, outPath: string) => {
  const css = fs.readFileSync(cssPath);
  try {
    const result = await postcss([postcssImport]).process(css, {
      from: cssPath,
      to: outPath
    });
    fs.writeFileSync(outPath, result.css);
    if (numSyntaxErrors > 0) {
      console.log("Compile successful");
      numSyntaxErrors = 0;
    }
  } catch (error) {
    if (error.name === "CssSyntaxError") {
      numSyntaxErrors += 1;
      console.log(error.toString());
    } else {
      throw error;
    }
  }
};
