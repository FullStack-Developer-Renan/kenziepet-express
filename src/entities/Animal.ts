import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Characteristic } from "./Characteristic";
import { Group } from "./Group";

@Entity()
export class Animal {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  age!: number;

  @Column()
  weight!: number;

  @Column()
  sex!: string;

  @ManyToOne(() => Group, (group) => group.animal)
  group!: Group;

  @ManyToMany(
    () => Characteristic,
    (characteristic) => characteristic.animals,
    { cascade: true }
  )
  @JoinTable()
  characteristic!: Characteristic[];
}
