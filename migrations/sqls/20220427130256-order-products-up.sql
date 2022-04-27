CREATE TABLE order_products(
  id SERIAL PRIMARY KEY,
  orderId bigint REFERENCES orders(id) NOT NULL,
  productId bigint REFERENCES products(id) NOT NULL,
  quantity integer NOT NULL
)