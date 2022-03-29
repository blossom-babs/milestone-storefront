import bcrypt from 'bcrypt';
import client from '../database';

let pepper: string;
let salt: number;

const { SALT_ROUNDS, BCRYPT_PASSWORD } = process.env;

if (BCRYPT_PASSWORD && SALT_ROUNDS) {
  pepper = BCRYPT_PASSWORD;
  salt = Number(SALT_ROUNDS);
}

export type User = {
  firstName: string;
  lastName: string;
  password: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const sql = `SELECT * FROM users`;
      const conn = await client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get users. Returned with error ${error}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const sql = `SELECT * FROM users WHERE id=${id}`;
      const conn = await client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot get user. Returned with error ${error}`);
    }
  }

  async create(user: User): Promise<User> {
    try {
      const conn = await client.connect();
      user.password = await bcrypt.hash(user.password + pepper, salt);
      const sql = `INSERT INTO users (firstName, lastName, password) VALUES  ($1, $2, $3) RETURNING *`;
      const userValues = Object.values(user);
      const result = await conn.query(sql, userValues);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot create user. Returned with error ${error}`);
    }
  }

  async authenticate(name: string, password: string): Promise<User | string> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM users WHERE firstName='${name}'`;
      const result = await conn.query(sql);
      let response = '';
      if (result.rows.length) {
        const user = result.rows[0];
        const match = await bcrypt.compare(password + pepper, user.password);

        if (match) {
          response = user;
        } else {
          response = 'Incorrect password';
        }
      }
      conn.release();
      return response || 'User does not exist';
    } catch (error) {
      throw new Error(`Cannot authenticate user. Returned with error ${error}`);
    }
  }

  async destroy(id: string): Promise<User> {
    try {
      const sql = `DELETE FROM users WHERE id=${id} RETURNING *`;
      const conn = await client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot delte user. Returned with error ${error}`);
    }
  }

  //  change password
}
