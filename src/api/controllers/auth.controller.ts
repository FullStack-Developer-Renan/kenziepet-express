import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { User } from "../../entities";

export const login = async (req: Request, res: Response) => {
  const userRepository = getRepository(User);

  const { username, password } = req.body;

  const user = await userRepository.findOne({ where: { username } });

  if (!user) return res.sendStatus(404);

  if (!bcrypt.compareSync(password, user.password)) return res.sendStatus(401);

  const token = jwt.sign({ id: user.id }, "xpto");

  res.status(200).send({ token });
};
