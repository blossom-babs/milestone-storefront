import { Request, Response, Application } from "express";
import { Order, OrderStore } from "../models/orders";
import verifyAuthToken from "./auth/verifyAuthToken";

const store = new OrderStore()

const create = async (req: Request, res: Response) => {
  try {
    const order: Order = req.body
    const result = await store.create(order)
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json(`${error}`)
  }
}

const OrdersRoutes = (app: Application) => {
  app.post('/orders', verifyAuthToken, create)
}

export default OrdersRoutes