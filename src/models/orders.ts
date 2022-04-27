import client from '../database';

export type Order = {
  userId: string;
  status: string;
};

export type OrderProducts = {
  productId: string;
  orderId: string;
  quantity: number;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM orders`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async create(order: Order): Promise<Order[] | string> {
    try {
      const conn = await client.connect();
      const findUser = `SELECT * FROM users WHERE id='${order.userId}'`;
      const findUserResult = await conn.query(findUser);
      if (findUserResult.rows.length < 1) return 'User does not exist';
      const sql = `INSERT INTO orders (userId, order_status) VALUES ($1, $2) RETURNING *`;
      const orderValues = Object.values(order);
      const result = await conn.query(sql, orderValues);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async show(id: string): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM orders WHERE id=${id}`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async addProducts(orderId: string, productId: string, quantity: number) {
    try {
      const conn = await client.connect();
      const findOrder = `SELECT * FROM orders WHERE id=${orderId}`;
      const findOrderResult = await conn.query(findOrder);
      if (findOrderResult.rows.length < 1) return 'Order does not exist';

      const findProduct = `SELECT * FROM products WHERE id=${productId}`;
      const findProductResult = await conn.query(findProduct);
      if (findProductResult.rows.length < 1) return 'Product does not exist';

      const sql = `INSERT INTO order_products (orderId, productId, quantity) values ($1, $2, $3) RETURNING *`;
      const result = await conn.query(sql, [orderId, productId, quantity]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}
