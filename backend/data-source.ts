import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

const isProduction = process.env.NODE_ENV === 'production';
const entitiesPath = isProduction 
  ? ['dist/**/*.entity{.ts,.js}']
  : ['src/**/*.entity{.ts,.js}'];
const migrationsPath = isProduction
  ? ['dist/migrations/**/*{.ts,.js}']
  : ['src/migrations/**/*{.ts,.js}'];

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'recme',
  entities: entitiesPath,
  migrations: migrationsPath,
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
});

