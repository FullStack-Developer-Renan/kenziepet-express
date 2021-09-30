import { Request, Response } from "express";

import { getRepository } from "typeorm";
import { User } from "../../entities";

export const create = async (req: Request, res: Response) => {
  const userRepository = getRepository(User);

  const { username, password, is_superuser } = req.body;
  const user = new User({ username, password, is_superuser });

  const createdUser = await userRepository.save(user);

  res.status(201).send(createdUser);
};

export const get = async (req: Request, res: Response) => {
  const userRepository = getRepository(User);

  const { username } = req.params;
  const user = await userRepository.findOne({ where: { username } });
  res.status(201).send(user);
};
