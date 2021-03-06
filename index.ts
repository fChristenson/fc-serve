#! /usr/bin/env node
const ts = require("ts-node");
ts.register();

import { buildProdApp, watchApp } from "./src/libs/app/app";
import { args } from "./src/libs/args/args";
import { copyConfig } from "./src/libs/config/config";
//import { buildImage } from "./src/libs/container/image";
import { initProject } from "./src/libs/init/init";
import { watchCss, cssPostBuild } from "./src/libs/css/css";
import { watchTs, webpackProdBuild } from "./src/libs/bundler/bundler";
import {
  initPackageJson,
  updatePackageJson
} from "./src/libs/packages/packages";
import { buildImage } from "./src/libs/container/image";

const runProdSteps = () => {
  buildProdApp();
  webpackProdBuild();
  cssPostBuild();
  copyConfig();
};

(async () => {
  if (args.release) {
    runProdSteps();
  } else if (args.webpack) {
    watchTs();
  } else if (args.postcss) {
    watchCss();
  } else if (args.init) {
    initProject();
    initPackageJson();
  } else if (args.update) {
    updatePackageJson();
  } else if (args.build) {
    buildImage();
  } else {
    watchApp();
  }

  process.on("uncaughtException", e => {
    console.log(e.message);
    console.log(e.stack);
    process.exit(1);
  });
})();
