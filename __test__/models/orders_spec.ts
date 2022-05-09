import { OrderStore } from './../../src/models/orders';
const store = new OrderStore()

describe('order model', () => {
  it('expects index method to return orders in the database', async () => {
    const result = await store.index()
    expect(result).toBe([])
  })

  it('expects create method to add new order to database', async () => {
    let order = { userId: '1', status: 'open' }
    const result = await store.create(order)
    expect(result).toBeDefined()
  })

  it('expects to return an order if it exists in the database', async () => {
    const result = await store.show("1")
    expect(result).toBeDefined()
  })

  it('expects to add a product to an exisiting open order', async () => {
    const result = await store.addProducts("1", "1", 5)
    expect(result).toBe([])
  })
})