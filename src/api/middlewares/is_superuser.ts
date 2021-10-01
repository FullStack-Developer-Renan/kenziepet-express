import { Request, Response, NextFunction } from "express";
import { User } from "../../entities";

const filterIsSuperUSer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { is_superuser } = req.user as User;

  if (is_superuser) return next();

  res.sendStatus(401);
};

export default filterIsSuperUSer;
