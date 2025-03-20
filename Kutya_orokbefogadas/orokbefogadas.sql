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