import { Application } from 'express';
import UserRoutes from './users';
import ProductStores from './products';


const indexRoute = (app: Application) => {
  UserRoutes(app)
  ProductStores(app)
}

export default indexRoute
