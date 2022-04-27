CREATE TABLE orders(
  id SERIAL PRIMARY KEY,
  userId bigint REFERENCES users(id) NOT NULL,
  order_status VARCHAR(255) NOT NULL
)
