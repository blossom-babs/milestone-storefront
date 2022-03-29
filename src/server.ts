import express, { Request, Response, Application } from 'express';
import { ProductStores, UserRoutes } from './handlers';

const app: Application = express();
const address: string = '0.0.0.0:8090';
const port = 8090;
app.use(express.json());

ProductStores(app);
UserRoutes(app);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    Message: `You have accessed Blossom store's front. The following routes are available to be accessed: /products, /users, /orders.`,
  });
});

app.get('*', (req: Request, res: Response) => {
  res
    .status(200)
    .json({ Message: 'You tried to access a route that does not exist' });
});

app.listen(port, () => {
  console.log(`starting app on: ${address}`);
});
