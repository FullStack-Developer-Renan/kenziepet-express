import { Request, Response, NextFunction } from "express";

const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    res.sendStatus(401);
  }

  return next();
};

export default authentication;
