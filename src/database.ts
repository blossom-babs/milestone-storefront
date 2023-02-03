import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  ENV,
  POSTGRES_TEST_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
} = process.env;

let client: Pool;
if (ENV === 'test') {
  console.log('I am in dev')
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_TEST_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
} else if (ENV === 'dev') {
  console.log('I am in dev')
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
} else {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_TEST_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
}

export default client;
