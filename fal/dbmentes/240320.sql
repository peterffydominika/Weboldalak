-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Már 20. 19:21
-- Kiszolgáló verziója: 10.4.27-MariaDB
-- PHP verzió: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `fal`
--
CREATE DATABASE IF NOT EXISTS `fal` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `fal`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalo`
--

DROP TABLE IF EXISTS `felhasznalo`;
CREATE TABLE `felhasznalo` (
  `fnev` char(50) NOT NULL,
  `nev` char(40) NOT NULL,
  `jelszo` char(40) NOT NULL,
  `jog` tinyint(3) UNSIGNED NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `felhasznalo`
--

INSERT INTO `felhasznalo` (`fnev`, `nev`, `jelszo`, `jog`) VALUES
('elek@elek.hu', 'Mekk Elek', '2f712f2b4c17b108f5961465d36a19c98301c173', 2),
('kopasznyaku@elek.hu', 'Kopasznyakú', '2f712f2b4c17b108f5961465d36a19c98301c173', 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `uzenet`
--

DROP TABLE IF EXISTS `uzenet`;
CREATE TABLE `uzenet` (
  `id` int(10) UNSIGNED NOT NULL,
  `valasz` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `felhid` char(50) NOT NULL,
  `uzenet` varchar(300) NOT NULL,
  `kep` mediumblob NOT NULL,
  `vankep` tinyint(1) NOT NULL,
  `torolt` tinyint(1) NOT NULL,
  `ido` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `felhasznalo`
--
ALTER TABLE `felhasznalo`
  ADD PRIMARY KEY (`fnev`);

--
-- A tábla indexei `uzenet`
--
ALTER TABLE `uzenet`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `uzenet`
--
ALTER TABLE `uzenet`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
