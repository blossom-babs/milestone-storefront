import client from '../database';

export type Product = {
  name: string;
  price: number;
  category: string;
};

export class ProductStore {
  async index() {
    try {
      const sql = `SELECT * FROM products`;
      const conn = await client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get Products: ${error}`);
    }
  }

  async create(product: Product) {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *';
      const productValues = Object.values(product);
      const result = await conn.query(sql, productValues);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot save product: ${error}`);
    }
  }

  async show(id: string) {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM products WHERE id=${id}`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot get product with id ${id}: ${error}`);
    }
  }

  async delete(id: string) {
    try {
      const conn = await client.connect();
      const sql = `DELETE FROM products WHERE id=${id} RETURNING *`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot delete product with id ${id}: ${error}`);
    }
  }

  async category(cat:string){
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM products WHERE category='${cat}'`;
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (error) {
      throw new Error(`${cat} does not exist: ${error}`);

    }
  }
}
