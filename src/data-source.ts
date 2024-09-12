import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Config } from './config/config';
import { readFileSync } from 'fs';
import path, { join } from 'path';

export let dbConfig: any = {
  type: 'postgres',
  host: Config.dbHost,
  port: Config.dbPort,
  username: Config.dbUsername,
  password: Config.dbPassword,
  database: Config.dbName,
  synchronize: Config.dbSync,
  logging: false,
  entities: [join(__dirname, 'entities', '*.{js,ts}')],
  migrations: [join(__dirname, 'migration', '*.{js,ts}')],
  subscribers: [join(__dirname, 'modules', '**', '*.subscriber.{js,ts}')],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};

export const AppDataSource = new DataSource(dbConfig);

