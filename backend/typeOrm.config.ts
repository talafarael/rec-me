import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();
const isProduction = process.env.NODE_ENV === 'production';

export default new DataSource({
  type: 'postgres',
  url: configService.get<string>('DATABASE_URL'),
  entities: isProduction 
    ? ['dist/src/**/*.entity{.ts,.js}']
    : ['src/**/*.entity{.ts,.js}'],
  migrations: isProduction
    ? ['dist/src/migrations/**/*{.ts,.js}']
    : ['src/migrations/**/*{.ts,.js}'],
});
