import { Request, Response, Application } from 'express';
import { ProductStore, Product } from '../models/products';
import verifyAuthToken from './auth/verifyAuthToken';

const productStore = new ProductStore();

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = req.body;
    const result = await productStore.create(product);
    res.status(200).json(result);
  } catch (error) {
    res.status(204).json({ Message: `Error with saving product` });
  }
};

const index = async (req: Request, res: Response) => {
  try {
    const result = await productStore.index();
    if (result.length < 1) {
      res
        .status(200)
        .json({ Message: 'You have product saved in the library' });
    }
    res.status(200).json(result);
  } catch (error) {
    res
      .status(200)
      .json({ message: `Could not fetch product with error ${error}` });
  }
};

const show = async (req: Request, res: Response) => {
  console.log(req.query)
  try {
    const category = req.query.cat as string
    console.log(category)
    console.log('shey nothing con they log ni')
    const id = req.query.id as string
    const result = await productStore.show(id, category);
    if (result === undefined) {
      res
        .status(200)
        .json({ Message: `Product with id ${id} cannot be found.` });
      return;
    }
    res.status(200).json(result);
  } catch (error) {
    res
      .status(200)
      .json({ message: `Could not fetch product with id ${req.params.id}` });
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await productStore.delete(id);
    res.status(200).json(result);
  } catch (error) {
    throw new Error(`Could not retrieve product: ${error}`);
  }
};

const ProductStores = (app: Application) => {
  app.post('/products', verifyAuthToken, create);
  app.get('/products', index);
  app.get('/products/?cat=', show);
  app.delete('/products/:id', destroy);
};

export default ProductStores;
