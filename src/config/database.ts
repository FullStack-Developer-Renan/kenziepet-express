import { ConnectionOptions } from "typeorm";

// import {Movie} from '../entities';

const config: ConnectionOptions = {
  type: "sqlite",
  database: `${__dirname}/../../database.sqlite`,
  entities: [`${__dirname}/../entities/*.ts`],
  synchronize: true, // Cria as tabela automaticamente
  cli: {
    entitiesDir: `${__dirname}/../entities`,
    migrationsDir: `${__dirname}/../migrations`,
    subscribersDir: `${__dirname}/../subscribers`,
  },
};

export default config;
