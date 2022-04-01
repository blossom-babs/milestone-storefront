import { Product, ProductStore } from '../models/products';
import client from "../database";

const store = new ProductStore()

describe('products model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined()
  })
})