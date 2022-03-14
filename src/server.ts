import express, { Request, Response, Application } from 'express';
import BookRoutes from './handlers/books';

const app: Application = express();
const address: string = '0.0.0.0:3000';
BookRoutes(app);

app.get('*', (req: Request, res: Response) => {
  res
    .status(200)
    .json({ Message: 'You tried to access a route that does not exist' });
});

app.listen(3000, () => {
  console.log(`starting app on: ${address}`);
});
