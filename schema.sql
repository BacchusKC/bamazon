DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  product_sales DECIMAL(15,2) NOT NULL DEFAULT 0.00,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Playstation 4 Pro", "Electronics", 299.99, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nintendo Switch", "Electronics", 299.99, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Greenies Dental Treets", "Pet Supplies", 12.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Royal Canin Dog Food", "Pet Supplies", 62.99, 17);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Starbucks Doubleshot 12pk", "Food & Bev", 14.99, 37);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Planters Nuts 24pk", "Food & Bev", 8.53, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Lucky Brand Jeans", "Clothing", 99.99, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Band Tee", "Clothing", 29.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("6 Person Tent", "Sports & Outdoors", 112.00, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sleeping Bag", "Sports & Outdoors", 42.50, 19);

CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(45) NULL,
  over_head_costs DECIMAL(15,2) NULL,
  PRIMARY KEY (departments_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Electronics", 4000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Video Games", 1000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Movies, Music & TV", 500);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Pet Supplies", 300);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Food & Bev", 800);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Clothing", 2000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Sports & Outdoors", 3000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Home & Garden", 1500);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("School Supplies", 800);
