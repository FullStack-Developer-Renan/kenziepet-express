import { Request, Response, NextFunction } from "express";
import { User } from "../../entities";

const filterIsSuperUSer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    res.sendStatus(401);
  }
  const { is_superuser } = req.user as User;

  if (is_superuser) return next();

  if (!is_superuser) res.sendStatus(403);
};

export default filterIsSuperUSer;
