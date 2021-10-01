import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Animal } from "./Animal";

@Entity()
export class Characteristic {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToMany(() => Animal, (animal) => animal.characteristics)
  animals!: Animal[];
}
