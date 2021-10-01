import { Request, Response } from "express";
import { getConnection, getRepository } from "typeorm";
import { Group } from "../../entities";
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
  animal.characteristics = characteristics;

  const group = await createGroup(requestBody.group);
  animal.group = group;

  const createdanimal = await animalRepository.save(animal);

  res.status(201).send(createdanimal);
};

export const list = async (req: Request, res: Response) => {
  const animalRepository = getRepository(Animal);
  const animals: Array<Animal> = await animalRepository.find({
    relations: ["group", "characteristics"],
  });

  res.send(animals);
};

export const retrieve = async (req: Request, res: Response) => {
  const animalRepository = getRepository(Animal);

  const animal: Animal | undefined = await animalRepository.findOne(
    req.params.animalId,
    {
      relations: ["group", "characteristics"],
    }
  );

  if (animal === undefined) {
    return res.status(404).send({ error: "Not Found" });
  }

  res.send(animal);
};

export const update = async (req: Request, res: Response) => {
  const animalRepository = getRepository(Animal);
  const groupRepository = getRepository(Group);

  const animal: Animal | undefined = await animalRepository.findOne(
    req.params.animalId
  );

  if (req.body.group) {
    const group: Group | undefined = await groupRepository.findOne(
      req.body.group
    );
    if (group == undefined) {
      return res.status(404).send({ error: "Group Not Found" });
    }
  }

  if (animal === undefined) {
    return res.status(404).send({ error: "Animal Not Found" });
  }

  const updateRes = await animalRepository.update(animal.id, { ...req.body });

  const animalResponse: Animal | undefined = await animalRepository.findOne(
    animal.id,
    {
      relations: ["group", "characteristics"],
    }
  );

  res.send(animalResponse);
};

export const destroy = async (req: Request, res: Response) => {
  const animalRepository = getRepository(Animal);

  const animal: Animal | undefined = await animalRepository.findOne(
    req.params.animalId
  );

  if (!animal) {
    return res.status(404).send({ error: "Not Found" });
  }

  animalRepository.delete(req.params.animalId);

  res.status(204).send();
};
