import path from "path";
import { getConfig, getFileDirectory } from "../config/config";
import { ILoadedFunction } from "./LoadedFunction";
import { errorHandler } from "../errors/errorHandler";
import { args } from "../args/args";

export const loadFunctions = (): ILoadedFunction[] => {
  const configDir = getFileDirectory(args.configuration);
  const config = getConfig();
  return config.server.spec.paths.map((p: any) => {
    const scriptPath = path.resolve(configDir, p.script);
    return {
      pathData: p,
      functions: [].concat(require(scriptPath)).map(errorHandler)
    };
  });
};
