import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Animal } from "../../entities/Animal";
import { createCharacteristic } from "../services/characteristic.services";
import { createGroup } from "../services/group.services";

export const create = async (req: Request, res: Response) => {
  const animalRepository = getRepository(Animal);

  const animal = new Animal();

  const requestBody = req.body;

  animal.name = requestBody.name;
  animal.age = requestBody.age;
  animal.weight = requestBody.weight;
  animal.sex = requestBody.sex;

  const characteristics = await createCharacteristic(
    requestBody.characteristics
  );
  animal.characteristic = characteristics;

  const group = await createGroup(requestBody.group);
  animal.group = group;

  const createdanimal = await animalRepository.save(animal);

  console.log(createdanimal);

  res.status(201).send(createdanimal);
};
