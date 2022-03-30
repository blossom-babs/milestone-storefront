CREATE TABLE orders (
  id serial PRIMARY KEY,
  user_id bigint NOT NULL REFERENCES users (id),
  product_id bigint NOT NULL REFERENCES products (id),
  status VARCHAR(255) NOT NULL,
  created_at timestamp without time zone NOT NULL,
  updated_at timestamp without time zone NOT NULL
)
