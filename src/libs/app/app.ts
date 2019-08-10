import express, { Application, Response, Request, NextFunction } from "express";
import { ILoadedFunction } from "../functionLoader/LoadedFunction";
import { debug } from "../logging/logging";
import { getFileDirectory, getConfig } from "../config/config";
import { args } from "../args/args";
import fs from "fs";
import path from "path";

export const buildProdApp = (): ILoadedFunction[] => {
  const configDir = getFileDirectory(args.configuration);
  const config = getConfig();
  return config.server.spec.paths.map((p: any) => {
    const scriptPath = path.join(configDir, p.script);
    const scriptDir = getFileDirectory(p.script);
    const content = fs.readFileSync(scriptPath, "utf8");
    fs.mkdirSync(path.join(configDir, "release", scriptDir), {
      recursive: true
    });
    fs.writeFileSync(path.join(configDir, "release", p.script), content);
  });
};

export const initApp = (functions: ILoadedFunction[]): Application => {
  const app = express();
  const config = getConfig();

  if (config.server.spec.static) {
    app.use(
      express.static(
        path.join(
          getFileDirectory(args.configuration),
          config.server.spec.static
        )
      )
    );
  }

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  functions.forEach(f => {
    const method = f.pathData.method.toLowerCase();
    debug("Added: ", method, f.pathData.path);
    if (method === "use") {
      // @ts-ignore
      app[method](...f.functions);
    } else {
      // @ts-ignore
      app[method](f.pathData.path, ...f.functions);
    }
  });
  app.use((_req: Request, res: Response, _next: NextFunction) => {
    res.status(404).json({ error: "404" });
  });
  app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
    res.status(500).json({ error: error.message });
  });
  return app;
};
