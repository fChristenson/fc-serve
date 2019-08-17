import fs from "fs";
import path from "path";
import { args } from "../args/args";
import ejs from "ejs";

export const initProject = () => {
  createFiles();
};

export const createFiles = () => {
  const gitIgnore = fs.readFileSync(
    path.join(__dirname, "gitignore.txt"),
    "utf8"
  );
  const extension = args.js ? "js" : "ts";
  const configTemplate = fs.readFileSync(
    path.join(__dirname, "config.yaml.template"),
    "utf8"
  );
  const config = ejs.render(configTemplate, { extension });
  const serverScript = fs.readFileSync(
    path.join(__dirname, `helloWorld.${extension}`),
    "utf8"
  );
  const css = fs.readFileSync(path.join(__dirname, "main.css"), "utf8");
  const clientEntry = fs.readFileSync(
    path.join(__dirname, `main.${extension}x`),
    "utf8"
  );
  const html = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");

  fs.writeFileSync(path.join(process.cwd(), ".gitignore"), gitIgnore);
  fs.writeFileSync(path.join(process.cwd(), "config.yaml"), config);
  fs.mkdirSync(path.join(process.cwd(), "src", "public"), { recursive: true });
  fs.mkdirSync(path.join(process.cwd(), "src", "routes"), { recursive: true });
  fs.writeFileSync(
    path.join(process.cwd(), `src/routes/helloWorld.${extension}`),
    serverScript
  );
  fs.writeFileSync(path.join(process.cwd(), "src/public/main.css"), css);
  fs.writeFileSync(
    path.join(process.cwd(), `src/public/main.${extension}x`),
    clientEntry
  );
  fs.writeFileSync(path.join(process.cwd(), "src/public/index.html"), html);
};
