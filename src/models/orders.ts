import client from "../database";

export type Order = {
  userId: string,
  productId: string,
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

  async create(order:Order): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = `INSERT INTO orders (userId, productId, status, quantity) VALUES ($1, $2, $3, $4) RETURNING *`;
      const orderValues = Object.values(order)
      console.log(order)
      const result = await conn.query(sql, orderValues);
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