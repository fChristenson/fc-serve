import { execSync } from "child_process";
import path from "path";
import { getConfig } from "../config/config";

export const buildImage = () => {
  const commitId = execSync("git rev-parse head")
    .toString("utf8")
    .trim();
  const dockerfile = path.resolve(__dirname, "Dockerfile");
  const config = getConfig();
  execSync(
    `docker build . -f ${dockerfile} -t ${config.meta.name}:${commitId} -t ${
      config.meta.name
    }:latest`,
    {
      stdio: "inherit"
    }
  );
};
