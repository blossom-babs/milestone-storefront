import { Application } from 'express';
import UserRoutes from './users';
import ProductStores from './products';
import OrdersRoutes from './orders';

const indexRoute = (app: Application) => {
  UserRoutes(app);
  ProductStores(app);
  OrdersRoutes(app)
};

export default indexRoute;
