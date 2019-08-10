import { args } from "../args/args";

export const debug = (...params: any[]) => {
  if (args.verbose) {
    console.log(...params);
  }
};
