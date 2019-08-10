import yaml from "js-yaml";
import path from "path";
import fs from "fs";
import { inspect } from "util";
import { debug } from "../logging/logging";
import { args } from "../args/args";

let config: any | null = null;

export const getConfig = () => {
  if (config) return config;
  config = yaml.safeLoad(fs.readFileSync(args.configuration, "utf8"));
  debug("Loaded config: ", inspect(config, { depth: Infinity }));
  return config;
};

export const getFileDirectory = (path: string): string => {
  const pathArray = path.split("/");
  return pathArray.slice(0, pathArray.length - 1).join("/");
};

export const copyConfig = () => {
  const dir = getFileDirectory(args.configuration);
  const src = path.join(dir, "config.yaml");
  const dest = path.join(dir, "release", "config.yaml");
  fs.copyFileSync(src, dest);
};
