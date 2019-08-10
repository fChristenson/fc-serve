import { Response, NextFunction, Request } from "express";

export const errorHandler = (
  fn: (req: Request, res: Response, next?: NextFunction) => void
) => (req: Request, res: Response, next: NextFunction) => {
  return Promise.resolve(fn(req, res, next)).catch(next);
};
