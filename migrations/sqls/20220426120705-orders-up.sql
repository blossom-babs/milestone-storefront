CREATE TABLE orders(
  id SERIAL PRIMARY KEY,
  userId bigint REFERENCES users(id) NOT NULL,
  productId bigint REFERENCES products(id) NOT NULL,
  quantity INTEGER NOT NULL,
  status VARCHAR(255) NOT NULL
)
