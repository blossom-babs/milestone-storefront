import { Request, Response, Application } from "express";
import { Order, OrderStore } from "../models/orders";
import verifyAuthToken from "./auth/verifyAuthToken";

const store = new OrderStore()

const create = async (req: Request, res: Response) => {
  try {
    const order: Order = req.body
    console.log(order)
    const result = await store.create(order)
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json(`${error}`)
  }
}

const index = async (req: Request, res: Response) => {
  try {
    const result = await store.index()
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json(`${error}`)
  }


}

const show = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    console.log(id)
    const result = await store.show(id)
    if (!result) {
      res.status(200).json({ Message: 'No order found' })
      return;
    }
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json(`${error}`)
  }
}

const OrdersRoutes = (app: Application) => {
  app.post('/orders', verifyAuthToken, create)
  app.get('/orders', verifyAuthToken, index)
  app.get('/orders/:id', verifyAuthToken, show)
}

export default OrdersRoutes