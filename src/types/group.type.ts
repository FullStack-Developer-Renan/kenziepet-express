import { Animal, Group } from "../../src/entities/index";
import { CharacteristicInterface } from "./characteristic.type";

export interface AnimalInterface {
  id: number;
  name: string;
  age: number;
  weight: number;
  sex: string;
  group: GroupInterface;
  characteristic: Array<CharacteristicInterface>;
}

export interface GroupInterface {
  name: string;
  scientific_name: string;
}
