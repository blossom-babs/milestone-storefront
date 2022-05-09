import { ProductStore } from '../../src/models/products';
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
