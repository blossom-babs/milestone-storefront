import { Request, Response, Application } from 'express';
import { UserStore, User } from '../models/users';

const store = new UserStore();

const index = async (req: Request, res: Response) => {
  try {
    const users: User[] = await store.index();
    if (users.length < 1) {
      res.status(200).json({ Message: 'You have no users yet' });
      return;
    }
    res.status(200).json(users);
  } catch (error) {
    res
      .status(400)
      .json({ Message: `Something went wrong with your query ${error}` });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const user: User = await store.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    res
      .status(400)
      .json({ Message: `Something went wrong with your query ${error}` });
  }
};

const authenticate = async (req: Request, res: Response) => {
  try {
    const user = await store.authenticate(
      req.body.firstName,
      req.body.password
    );
    res.status(200).json(user);
  } catch (error) {
    res
      .status(200)
      .json({ Message: `Something went wrong with your query ${error}` });
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const user: User = await store.show(req.params.id);
    if (!user) {
      res.status(200).json({ Message: 'User does not exist' });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res
      .status(400)
      .json({ Message: `Something went wrong with your query ${error}` });
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const user: User = await store.destroy(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res
      .status(400)
      .json({ Message: `Something went wrong with your query ${error}` });
  }
};

const UserRoutes = (app: Application) => {
  app.get('/users', index);
  app.post('/users', create);
  app.post('/users/login', authenticate);
  app.get('/users/:id', show);
  app.delete('/users/:id', destroy);
};

export default UserRoutes;
