import dotenv from 'dotenv'
import { Pool } from 'pg'
dotenv.config()

const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD } = process.env
const Client = new Pool({
  host: POSTGRES_HOST,
  database: POSTGRES_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD
})
console.log('client connection from db', Client)

export default Client;