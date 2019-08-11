import commander from "commander";
import path from "path";

const getEnvDependencies = () => {
  return [
    "Docker https://www.docker.com/get-started",
    "Git https://git-scm.com/book/en/v2/Getting-Started-Installing-Git"
  ].join("\n* ");
};

export const args = commander
  .version("1.0.0")
  .description(
    `fc-serve requires the following tools installed in your environment: \n\n* ${getEnvDependencies()}`
  )
  .option(
    "-c, --configuration <path>",
    "Configuration file",
    path.resolve(process.cwd(), "config.yaml")
  )
  .option("-s, --server", "Start server")
  .option("-w, --webpack", "Start webpack watch")
  .option("-p, --postcss", "Start postcss watch")
  .option("-j, --js", "Create JavaScript project")
  .option("-r, --release", "Create release build")
  .option("-i, --init", "Initialize a project")
  .option("-v, --verbose", "Enabled verbose logging")
  .option("-b, --build", "Build Docker image")
  .option("-u, --update", "Update packages")
  .parse(process.argv);
