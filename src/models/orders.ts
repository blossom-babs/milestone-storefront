import client from "../database";

export type Order = {
  userId: string,
  status: string,
}

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await client.connect()
      const sql = `SELECT * FROM orders`
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (error) {
      throw new Error(`${error}`)
    }
  }

  async create(order: Order): Promise<Order[] | string> {
    try {
      console.log('from model file', order.userId)
      const conn = await client.connect();
      const findUser = `SELECT * FROM users WHERE id='${order.userId}'`
      const findUserResult = await conn.query(findUser)
      if (findUserResult.rows.length < 1) return 'User does not exist';
      const sql = `INSERT INTO orders (userId, order_status) VALUES ($1, $2) RETURNING *`;
      const orderValues = Object.values(order)
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
      const sql = `SELECT * FROM orders WHERE id=${id}`
      const result = await conn.query(sql)
      conn.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`${error}`)
    }
  }
}