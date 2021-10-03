import { Request, Response } from "express";
import { getConnection, getRepository } from "typeorm";
import { Characteristic, Group } from "../../entities";
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

  // let group = null;

  // if (requestBody.group != null) {
  //   group = await createGroup(requestBody.group);
  // }

  // animal.group && animal.group == group;
  if (animal.group != null) {
    const group = await createGroup(requestBody.group);
    animal.group = group;
  }

  const createdAnimal = await animalRepository.save(animal);

  const animalResponse: Animal | undefined = await animalRepository.findOne(
    createdAnimal.id,
    {
      relations: ["group", "characteristics"],
    }
  );

  res.status(201).send(animalResponse);
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
  const characteristicRepository = getRepository(Characteristic);

  const animal: Animal | undefined = await animalRepository.findOne(
    req.params.animalId
  );

  if (animal === undefined) {
    return res.status(404).send({ error: "Animal Not Found" });
  }

  if (req.body.name) {
    animal.name = req.body.name;
  }

  if (req.body.age) {
    animal.age = req.body.age;
  }

  if (req.body.weight) {
    animal.weight = req.body.weight;
  }

  if (req.body.sex) {
    animal.sex = req.body.sex;
  }

  if (req.body.group) {
    const group: Group | undefined = await groupRepository.findOne(
      req.body.group
    );

    const originalGroup: Group | undefined = await groupRepository.findOne(
      req.params.id
    );
    console.log(originalGroup);

    if (originalGroup === undefined) {
      const group = await createGroup(req.body.group);
      animal.group = group;
    } else {
      if (req.body.group.name && originalGroup != undefined) {
        originalGroup.name = req.body.group.name;
      }

      if (req.body.group.scientific_name && originalGroup != undefined) {
        originalGroup.scientific_name = req.body.group.scientific_name;
      }

      if (req.body.group != undefined) {
        animal.group = originalGroup;
      }
    }
  }

  if (req.body.characteristics) {
    const characteristics = await createCharacteristic(
      req.body.characteristics
    );
    animal.characteristics = characteristics;
  }

  const updatedAnimal = await animalRepository.save(animal);

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
