import client from "../database";

export type Order = {
  userId: number,
  productId: number,
  status: string,
  quantity: number
}

export class OrderStore {
  async create(quantity:number, status:string, userId:number, productId:number) {
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
}