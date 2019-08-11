import { execSync } from "child_process";
import path from "path";
import fs from "fs";
import { internalPackages } from "./internalPackages";

export const initPackageJson = () => {
  execSync("npm init", { stdio: "inherit" });
  updatePackageJson();
};

export const updatePackageJson = () => {
  const packagesPath = path.join(process.cwd(), "package.json");
  const packages = require(packagesPath);
  packages.dependencies = getPackages();
  fs.writeFileSync(packagesPath, JSON.stringify(packages, null, 2));
  execSync("npm install", { stdio: "inherit" });
};

const getPackages = () => {
  const fcPackages = require(path.resolve(
    __dirname,
    "../../../../package.json"
  ));

  const packages = { ...fcPackages.dependencies };
  internalPackages.reduce((acc, p) => {
    delete acc[p];
    return acc;
  }, packages);

  return packages;
};
