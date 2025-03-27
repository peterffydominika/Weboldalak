CREATE DATABASE orokbefogadas;

USE orokbefogadas;

CREATE TABLE orokbefogadasok (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    dog VARCHAR(50) NOT NULL,
    adoption_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE regisztraciok (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(100) NOT NULL,
    sirname VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address VARCHAR(100) NOT NULL,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    password1 CHAR(64) NOT NULL,
    resetpassword CHAR(64) NOT NULL
);
