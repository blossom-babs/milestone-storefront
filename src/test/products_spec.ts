import { ProductStore } from '../models/products';
import client from "../database";

//console.log('marketr', process.env)

const store = new ProductStore();
describe('products model', () => {
  it('should have an index method', () => {
    expect(store.index()).toBeDefined();
  });

  it('should return a list of products', async () => {
    const result = await store.index();
    expect(result).toEqual([]);
  });
});
