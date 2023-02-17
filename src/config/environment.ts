import dotenv from 'dotenv';

dotenv.config();

const environment = {
  port: process.env.PORT || 3500,
  env: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL,
  jwtSecretKey: process.env.JWT_SECRET_KEY,
};

export { environment };
