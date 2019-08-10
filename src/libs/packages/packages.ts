import { execSync } from "child_process";
import path from "path";
import fs from "fs";

export const copyPackageJson = () => {
  execSync("npm init", { stdio: "inherit" });
  const fcPackages = require(path.resolve(
    __dirname,
    "../../../../package.json"
  ));
  const packagesPath = path.join(process.cwd(), "package.json");
  const packages = require(packagesPath);
  packages.dependencies = fcPackages.dependencies;
  fs.writeFileSync(packagesPath, JSON.stringify(packages, null, 2));
  execSync("npm install", { stdio: "inherit" });
};
