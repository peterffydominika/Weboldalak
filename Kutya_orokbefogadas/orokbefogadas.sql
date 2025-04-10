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
CREATE TABLE kutyak (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Nev VARCHAR(100) NOT NULL,
    Eletkor INT NOT NULL,
    Meret VARCHAR(20) NOT NULL,
    Kep_url VARCHAR(255) NOT NULL,
    Menhelyre_kerules_ideje DATE NOT NULL CURRENT_DATE
);

INSERT INTO kutyak (nev, eletkor, meret, kep_url, Menhelyre_kerules_ideje) VALUES
('Maxi', 2, 'kicsi', 'images/dog1.jpg', '2023-08-11'),
('Rex', 5, 'nagy', 'images/dog2.jpg', '2022-02-24'),
('Lucy', 1, 'kicsi', 'images/dog3.jpg', '2025-01-13'),
('Bella', 4, 'közepes', 'images/dog4.jpg', '2022-12-13'),
('Max', 3, 'kicsi', 'images/dog5.jpg', '2023-06-05'),
('Bambi', 6, 'nagy', 'images/dog6.jpg', '2020-09-29'),
('Zorro', 2, 'közepes', 'images/dogs2.jpg', '2023-09-02'),
('Charlie', 3, 'nagy', 'images/dog8.jpg', '2022-11-03'),
('Trixi', 1, 'közepes', 'images/dog9.jpg', '2024-01-22'),
('Bruno', 4, 'kicsi', 'images/dog10.jpg', '2023-10-07');
