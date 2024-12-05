import { config } from 'dotenv';
config();

export const environment = {
  PORT: process.env.PORT || 3001,
  DB_TYPE: process.env.DB_TYPE,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  SECRET_KEY: process.env.JWT_SECRET_KEY,
  EXPIRES_IN: process.env.JWT_EXPIRES_IN,
};
