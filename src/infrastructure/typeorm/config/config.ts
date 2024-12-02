import { DataSource } from 'typeorm';
import { environment } from '../../environments/environment';

export const AppDataSource = new DataSource({
  type: environment.DB_TYPE as any,
  host: environment.DB_HOST,
  port: environment.DB_PORT as any,
  username: environment.DB_USERNAME,
  password: environment.DB_PASSWORD,
  database: environment.DB_NAME,
  logging: true,
  entities: [],
  migrations: [],
});
