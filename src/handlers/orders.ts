import { Request, Response, Application } from "express";
import { Order, OrderStore } from "../models/orders";

const store = new OrderStore()

const create = async (req: Request, res: Response) => {
  try {

    const userId = Number(req.query.userId)
    const productId = Number(req.query.productId)
    const { quantity, status } = req.body
    const result = await store.create(quantity, status, userId, productId)
    res.status(200).json(result)
  } catch (error) {
    console.error(error)
  }
}

const OrdersRoutes = (app: Application) => {
  app.post('/orders/:userId/:productId', create)
}

export default OrdersRoutes