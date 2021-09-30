import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Animal } from "./Animal";

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  scientific_name!: string;

  @OneToMany(() => Animal, (animal) => animal.group)
  animal!: Animal;
}
