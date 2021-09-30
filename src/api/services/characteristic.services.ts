import { getRepository } from "typeorm";
import { Characteristic } from "../../entities";
import { CharacteristicInterface } from "../../types/characteristic.type";

export const createCharacteristic = async (
  characteristics: CharacteristicInterface[]
) => {
  return Promise.all(
    characteristics.map(async (characteristics) => {
      const characteristicRepository = getRepository(Characteristic);

      const characteristicExists = await characteristicRepository.findOne({
        name: characteristics.name,
      });

      if (characteristicExists) {
        return characteristicExists;
      }

      const characteristic = new Characteristic();
      characteristic.name = characteristics.name;

      return characteristic;
    })
  );
};
