import client from "../database";

export type Order = {
  userId: number,
  productId: number,
  status: string,
  quantity: number
}

export class OrderStore {
  async index(): Promise<Order> {
    try {
      const conn = await client.connect()
      const sql = `SELECT * FROM orders`
      const result = await conn.query(sql)
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`${error}`)
    }
  }

  async create(quantity: number, status: string, userId: number, productId: number): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = `INSERT INTO orders (userId, productId, status, quantity) VALUES ($1, $2, $3, $4) RETURNING *`;
      const result = await conn.query(sql, [userId, productId, status, quantity]);
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`${error}`)
    }
  }

  async show(id: string): Promise<Order[]> {
    try {
      const conn = await client.connect()
      const sql = `SELECT FROM order WHERE id=${id}`
      const result = await conn.query(sql)
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`${error}`)
    }
  }
}