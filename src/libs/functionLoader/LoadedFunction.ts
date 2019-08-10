import { Response, Request } from "express";

export interface ILoadedFunction {
  pathData: any;
  functions: (req: Request, res: Response) => void[];
}
