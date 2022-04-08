CREATE TABLE orders (
  id serial PRIMARY KEY,
  userId bigint REFERENCES users (id),
  productId bigint REFERENCES products (id),
  status VARCHAR(255) NOT NULL,
  quantity INTEGER NOT NULL,
  created_at timestamp without time zone NOT NULL,
  updated_at timestamp without time zone NOT NULL
)
