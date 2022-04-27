import client from '../database';

export type Product = {
  name: string;
  price: number;
  category: string;
};

const toLower = (arr: (string | number)[]) => {
  const newArr = []
  for (const word of arr) {
    if (typeof word === 'string') newArr.push(word.toLowerCase())
    else { newArr.push(word) }
  }
  return newArr
}

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
      const productValues = toLower(Object.values(product));
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

  async category(cat: string) {
    try {
      const catLower = cat.toLowerCase()
      const conn = await client.connect();
      const sql = `SELECT * FROM products WHERE category='${catLower}'`;
      const result = await conn.query(sql)
      if (result.rowCount < 1) return 'Category does not exist'
      conn.release()
      return result.rows
    } catch (error) {
      throw new Error(`${cat} does not exist: ${error}`);

    }
  }
}
