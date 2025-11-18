USE e_commerce_system;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin','seller','customer') DEFAULT 'customer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  seller_id INT,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  description TEXT,
  stock INT DEFAULT 0,
  category VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT,
  product_id INT,
  price DECIMAL(10,2) NOT NULL,
  quantity INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    TotalPrice DECIMAL(10,2),
    status ENUM("pending","paid","shipped","delivered","cancelled"),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
