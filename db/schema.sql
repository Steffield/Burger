--database
DROP DATABASE IF EXISTS burgers_db;

CREATE DATABASE burgers_db;
USE burgers_db;

-- table
CREATE TABLE burgers(
  id INTEGER NOT NULL AUTO_INCREMENT,
  burger_name VARCHAR(50) NOT NULL,
  devoured BOOLEAN DEFAULT false,
  PRIMARY KEY (id)
);
