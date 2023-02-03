import { ProductStore } from '../../models/products';
const store = new ProductStore();

//console.log('this is where am at', process.env.ENV)

describe('products model', () => {
  it('should have an index method', () => {
    expect(store.index()).toBeDefined();
  });

  it('should return a list of products', async () => {
    const result = await store.index();
    expect(result).toEqual([]);
  });
});
