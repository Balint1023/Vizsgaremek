-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2026. Feb 07. 13:53
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `backend`
--
CREATE DATABASE IF NOT EXISTS `backend` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci;
USE `backend`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `admin`
--

CREATE TABLE `admin` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`) VALUES
(1, 'ADMIN@2026', '$2y$12$WdC4kbalQD0j5IKwMYztdecIBWH6Y28SPKdhMb2mIevVKMKMf1.Rm');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `csoport`
--

CREATE TABLE `csoport` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nev` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `csoport`
--

INSERT INTO `csoport` (`id`, `nev`, `created_at`, `updated_at`) VALUES
(1, '10.A', NULL, NULL),
(2, '10.B', NULL, NULL),
(3, '10.C', NULL, NULL),
(4, '11.A', NULL, NULL),
(5, '11.B', NULL, NULL),
(6, '11.C', NULL, NULL),
(7, '12.A', NULL, NULL),
(8, '12.B', NULL, NULL),
(9, '12.C', NULL, NULL),
(20, '10BC', NULL, NULL),
(21, '11AC', NULL, NULL),
(22, '12AB', NULL, NULL),
(23, '12BC', NULL, NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `diak`
--

CREATE TABLE `diak` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nev` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `diak`
--

INSERT INTO `diak` (`id`, `nev`, `created_at`, `updated_at`) VALUES
(71230002001, 'Kiss Ádám', NULL, NULL),
(71230002002, 'Nagy Petra', NULL, NULL),
(71230002003, 'Szabó Bence', NULL, NULL),
(71230002004, 'Tóth Anna', NULL, NULL),
(71230002005, 'Varga Dávid', NULL, NULL),
(71230002006, 'Horváth Lili', NULL, NULL),
(71230002007, 'Kovács Márk', NULL, NULL),
(71230002008, 'Balogh Eszter', NULL, NULL),
(71230002009, 'Fekete Zsolt', NULL, NULL),
(71230002010, 'Molnár Nóra', NULL, NULL),
(71230002011, 'Papp Roland', NULL, NULL),
(71230002012, 'Lakatos Zsófia', NULL, NULL),
(71230002013, 'Oláh Gergő', NULL, NULL),
(71230002014, 'Szalai Luca', NULL, NULL),
(71230002015, 'Bíró Tamás', NULL, NULL),
(71230002016, 'Kerekes Emma', NULL, NULL),
(71230002017, 'Takács Bálint', NULL, NULL),
(71230002018, 'Sipos Réka', NULL, NULL),
(71230002019, 'Németh Kristóf', NULL, NULL),
(71230002020, 'Fodor Dóra', NULL, NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `diak_csoport`
--

CREATE TABLE `diak_csoport` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `diak_id` bigint(20) UNSIGNED NOT NULL,
  `csoport_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `diak_csoport`
--

INSERT INTO `diak_csoport` (`id`, `diak_id`, `csoport_id`, `created_at`, `updated_at`) VALUES
(1, 71230002001, 7, NULL, NULL),
(2, 71230002001, 22, NULL, NULL),
(3, 71230002002, 7, NULL, NULL),
(4, 71230002002, 22, NULL, NULL),
(5, 71230002003, 7, NULL, NULL),
(6, 71230002004, 7, NULL, NULL),
(7, 71230002004, 23, NULL, NULL),
(8, 71230002005, 7, NULL, NULL),
(9, 71230002005, 22, NULL, NULL),
(10, 71230002006, 8, NULL, NULL),
(11, 71230002006, 23, NULL, NULL),
(12, 71230002007, 8, NULL, NULL),
(13, 71230002007, 23, NULL, NULL),
(14, 71230002008, 8, NULL, NULL),
(15, 71230002009, 8, NULL, NULL),
(16, 71230002009, 22, NULL, NULL),
(17, 71230002010, 8, NULL, NULL),
(18, 71230002011, 4, NULL, NULL),
(19, 71230002011, 21, NULL, NULL),
(20, 71230002012, 4, NULL, NULL),
(21, 71230002012, 21, NULL, NULL),
(22, 71230002013, 4, NULL, NULL),
(23, 71230002014, 4, NULL, NULL),
(24, 71230002014, 21, NULL, NULL),
(25, 71230002015, 6, NULL, NULL),
(26, 71230002015, 21, NULL, NULL),
(27, 71230002016, 6, NULL, NULL),
(28, 71230002017, 6, NULL, NULL),
(29, 71230002018, 2, NULL, NULL),
(30, 71230002018, 20, NULL, NULL),
(31, 71230002019, 3, NULL, NULL),
(32, 71230002019, 20, NULL, NULL),
(33, 71230002020, 2, NULL, NULL);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `ertekeles`
--

CREATE TABLE `ertekeles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tanar_id` bigint(20) UNSIGNED NOT NULL,
  `diak_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `ertekeles`
--

INSERT INTO `ertekeles` (`id`, `tanar_id`, `diak_id`, `created_at`, `updated_at`) VALUES
(5, 1, 71230002001, '2026-02-07 12:52:41', '2026-02-07 12:52:41'),
(6, 3, 71230002001, '2026-02-07 12:52:41', '2026-02-07 12:52:41'),
(7, 5, 71230002001, '2026-02-07 12:52:41', '2026-02-07 12:52:41'),
(8, 7, 71230002001, '2026-02-07 12:52:41', '2026-02-07 12:52:41'),
(9, 9, 71230002001, '2026-02-07 12:52:41', '2026-02-07 12:52:41'),
(10, 2, 71230002002, '2026-02-07 12:52:41', '2026-02-07 12:52:41'),
(11, 4, 71230002002, '2026-02-07 12:52:41', '2026-02-07 12:52:41'),
(12, 6, 71230002002, '2026-02-07 12:52:41', '2026-02-07 12:52:41'),
(13, 8, 71230002002, '2026-02-07 12:52:41', '2026-02-07 12:52:41'),
(14, 10, 71230002002, '2026-02-07 12:52:41', '2026-02-07 12:52:41');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kerdesek`
--

CREATE TABLE `kerdesek` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tipus_id` bigint(20) UNSIGNED NOT NULL,
  `leiras` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `kerdesek`
--

INSERT INTO `kerdesek` (`id`, `tipus_id`, `leiras`, `created_at`, `updated_at`) VALUES
(1, 1, 'Év elején a tantárgya oktatásának megkezdésekor vagy egy-egy projekt előtt ismerteti az elvárásokat a szülőkkel, tanulókkal.', '2026-02-07 12:41:29', '2026-02-07 12:41:29'),
(2, 1, 'A tanulók értékelése következetes, fejlesztő hatású.', '2026-02-07 12:41:29', '2026-02-07 12:41:29'),
(3, 1, 'Tervezésében figyelembe veszi a tanulói igényeket és adottságokat, a tehetséges tanulóknak fejlődési lehetőséget biztosít, a lemaradó tanulókat igyekszik felzárkóztatni.', '2026-02-07 12:41:29', '2026-02-07 12:41:29'),
(4, 1, 'Oktató-nevelő munkájában szerepet kap a tanulók motiválása, épít a tanulók tevékeny részvételére.', '2026-02-07 12:41:29', '2026-02-07 12:41:29'),
(5, 1, 'Tervezésében épít a tanulók előzetes tudására, valamint a duális képzőhelyen szerzett ismeretekre, tapasztalatokra.', '2026-02-07 12:41:29', '2026-02-07 12:41:29'),
(6, 1, 'A tanítási órákon használja a digitális oktatás módszereit és eszközeit (pl. szakmára jellemző szoftverek vagy számítógép, okostelefon).', '2026-02-07 12:41:29', '2026-02-07 12:41:29'),
(7, 1, 'A tanítási órákon figyelembe veszi a tanulók szakmáját, a duális képzőhely szerepét.', '2026-02-07 12:41:29', '2026-02-07 12:41:29'),
(8, 1, 'Feleltetésnél, dolgozatírásnál mindig ismerteti az elvárásokat, amelyek segítenek felkészülni a vizsgára.', '2026-02-07 12:41:29', '2026-02-07 12:41:29'),
(9, 1, 'Teljesíthető követelményeket támaszt, és aszerint értékel.', '2026-02-07 12:41:29', '2026-02-07 12:41:29'),
(10, 1, 'A házi feladatokat, a tanulói munkákat rendszeresen ellenőrzi és értékeli, a visszajelzései egyértelműek, tárgyilagosak, fejlesztő hatásúak.', '2026-02-07 12:41:29', '2026-02-07 12:41:29'),
(11, 1, 'Év elején a tantárgya oktatásának megkezdésekor vagy egy-egy projekt előtt ismerteti az elvárásokat a szülőkkel, tanulókkal.', '2026-02-07 12:43:53', '2026-02-07 12:43:53'),
(12, 1, 'A tanulók értékelése következetes, fejlesztő hatású.', '2026-02-07 12:43:53', '2026-02-07 12:43:53'),
(13, 1, 'Tervezésében figyelembe veszi a tanulói igényeket és adottságokat, a tehetséges tanulóknak fejlődési lehetőséget biztosít, a lemaradó tanulókat igyekszik felzárkóztatni.', '2026-02-07 12:43:53', '2026-02-07 12:43:53'),
(14, 1, 'Oktató-nevelő munkájában szerepet kap a tanulók motiválása, épít a tanulók tevékeny részvételére.', '2026-02-07 12:43:53', '2026-02-07 12:43:53'),
(15, 1, 'Tervezésében épít a tanulók előzetes tudására, valamint a duális képzőhelyen szerzett ismeretekre, tapasztalatokra.', '2026-02-07 12:43:53', '2026-02-07 12:43:53'),
(16, 1, 'A tanítási órákon használja a digitális oktatás módszereit és eszközeit (pl. szakmára jellemző szoftverek vagy számítógép, okostelefon).', '2026-02-07 12:43:53', '2026-02-07 12:43:53'),
(17, 1, 'A tanítási órákon figyelembe veszi a tanulók szakmáját, a duális képzőhely szerepét.', '2026-02-07 12:43:53', '2026-02-07 12:43:53'),
(18, 1, 'Feleltetésnél, dolgozatírásnál mindig ismerteti az elvárásokat, amelyek segítenek felkészülni a vizsgára.', '2026-02-07 12:43:53', '2026-02-07 12:43:53'),
(19, 1, 'Teljesíthető követelményeket támaszt, és aszerint értékel.', '2026-02-07 12:43:53', '2026-02-07 12:43:53'),
(20, 1, 'A házi feladatokat, a tanulói munkákat rendszeresen ellenőrzi és értékeli, a visszajelzései egyértelműek, tárgyilagosak, fejlesztő hatásúak.', '2026-02-07 12:43:53', '2026-02-07 12:43:53');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kerdes_tipusok`
--

CREATE TABLE `kerdes_tipusok` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `megnevezes` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `kerdes_tipusok`
--

INSERT INTO `kerdes_tipusok` (`id`, `megnevezes`, `created_at`, `updated_at`) VALUES
(1, 'diák', '2026-02-07 12:41:29', '2026-02-07 12:41:29');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_12_20_153803_create_migrations_table', 1),
(5, '2025_12_23_193547_create_personal_access_tokens_table', 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tanar`
--

CREATE TABLE `tanar` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nev` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `tanar`
--

INSERT INTO `tanar` (`id`, `nev`, `created_at`, `updated_at`) VALUES
(1, 'Kovács Péter', '2026-02-07 12:43:53', '2026-02-07 12:43:53'),
(2, 'Szabó Anna', '2026-02-07 12:43:53', '2026-02-07 12:43:53'),
(3, 'Tóth László', '2026-02-07 12:43:53', '2026-02-07 12:43:53'),
(4, 'Nagy Éva', '2026-02-07 12:43:53', '2026-02-07 12:43:53'),
(5, 'Farkas Gábor', '2026-02-07 12:43:53', '2026-02-07 12:43:53'),
(6, 'Varga Katalin', '2026-02-07 12:43:53', '2026-02-07 12:43:53'),
(7, 'Horváth Zoltán', '2026-02-07 12:43:53', '2026-02-07 12:43:53'),
(8, 'Molnár Judit', '2026-02-07 12:43:53', '2026-02-07 12:43:53'),
(9, 'Balogh Tamás', '2026-02-07 12:43:53', '2026-02-07 12:43:53'),
(10, 'Kiss Mónika', '2026-02-07 12:43:53', '2026-02-07 12:43:53');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `tanar_csoport`
--

CREATE TABLE `tanar_csoport` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tanar_id` bigint(20) UNSIGNED NOT NULL,
  `csoport_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `tanar_csoport`
--

INSERT INTO `tanar_csoport` (`id`, `tanar_id`, `csoport_id`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '2026-02-07 12:43:53', '2026-02-07 12:43:53'),
(2, 2, 1, '2026-02-07 12:43:53', '2026-02-07 12:43:53'),
(3, 3, 2, '2026-02-07 12:43:53', '2026-02-07 12:43:53'),
(4, 4, 2, '2026-02-07 12:43:53', '2026-02-07 12:43:53'),
(5, 5, 3, '2026-02-07 12:43:53', '2026-02-07 12:43:53'),
(6, 6, 3, '2026-02-07 12:43:53', '2026-02-07 12:43:53'),
(7, 7, 1, '2026-02-07 12:43:53', '2026-02-07 12:43:53'),
(8, 8, 2, '2026-02-07 12:43:53', '2026-02-07 12:43:53'),
(9, 9, 3, '2026-02-07 12:43:53', '2026-02-07 12:43:53'),
(10, 10, 1, '2026-02-07 12:43:53', '2026-02-07 12:43:53');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `valaszok`
--

CREATE TABLE `valaszok` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `kerdes_id` bigint(20) UNSIGNED NOT NULL,
  `tanar_id` bigint(20) UNSIGNED NOT NULL,
  `ertek` tinyint(3) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `valaszok`
--

INSERT INTO `valaszok` (`id`, `kerdes_id`, `tanar_id`, `ertek`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 4, '2026-02-07 12:43:53', '2026-02-07 12:43:53'),
(2, 2, 1, 3, '2026-02-07 12:43:53', '2026-02-07 12:43:53'),
(3, 3, 1, 4, '2026-02-07 12:43:53', '2026-02-07 12:43:53'),
(4, 4, 1, 3, '2026-02-07 12:43:53', '2026-02-07 12:43:53'),
(5, 1, 2, 2, '2026-02-07 12:43:53', '2026-02-07 12:43:53'),
(6, 2, 2, 3, '2026-02-07 12:43:53', '2026-02-07 12:43:53');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- A tábla indexei `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- A tábla indexei `csoport`
--
ALTER TABLE `csoport`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `diak`
--
ALTER TABLE `diak`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `diak_csoport`
--
ALTER TABLE `diak_csoport`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `diak_csoport_diak_id_csoport_id_unique` (`diak_id`,`csoport_id`),
  ADD KEY `diak_csoport_csoport_id_foreign` (`csoport_id`);

--
-- A tábla indexei `ertekeles`
--
ALTER TABLE `ertekeles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ertekeles_diak_id_tanar_id_unique` (`diak_id`,`tanar_id`),
  ADD KEY `ertekeles_tanar_id_foreign` (`tanar_id`);

--
-- A tábla indexei `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- A tábla indexei `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- A tábla indexei `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `kerdesek`
--
ALTER TABLE `kerdesek`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kerdesek_tipus_id_foreign` (`tipus_id`);

--
-- A tábla indexei `kerdes_tipusok`
--
ALTER TABLE `kerdes_tipusok`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- A tábla indexei `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- A tábla indexei `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- A tábla indexei `tanar`
--
ALTER TABLE `tanar`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `tanar_csoport`
--
ALTER TABLE `tanar_csoport`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tanar_csoport_tanar_id_csoport_id_unique` (`tanar_id`,`csoport_id`),
  ADD KEY `tanar_csoport_csoport_id_foreign` (`csoport_id`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- A tábla indexei `valaszok`
--
ALTER TABLE `valaszok`
  ADD PRIMARY KEY (`id`),
  ADD KEY `valaszok_kerdes_id_foreign` (`kerdes_id`),
  ADD KEY `valaszok_tanar_id_foreign` (`tanar_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `admin`
--
ALTER TABLE `admin`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `csoport`
--
ALTER TABLE `csoport`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT a táblához `diak`
--
ALTER TABLE `diak`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71230002021;

--
-- AUTO_INCREMENT a táblához `diak_csoport`
--
ALTER TABLE `diak_csoport`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT a táblához `ertekeles`
--
ALTER TABLE `ertekeles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT a táblához `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `kerdesek`
--
ALTER TABLE `kerdesek`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT a táblához `kerdes_tipusok`
--
ALTER TABLE `kerdes_tipusok`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT a táblához `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `tanar`
--
ALTER TABLE `tanar`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `tanar_csoport`
--
ALTER TABLE `tanar_csoport`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `valaszok`
--
ALTER TABLE `valaszok`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `diak_csoport`
--
ALTER TABLE `diak_csoport`
  ADD CONSTRAINT `diak_csoport_csoport_id_foreign` FOREIGN KEY (`csoport_id`) REFERENCES `csoport` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `diak_csoport_diak_id_foreign` FOREIGN KEY (`diak_id`) REFERENCES `diak` (`id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `ertekeles`
--
ALTER TABLE `ertekeles`
  ADD CONSTRAINT `ertekeles_diak_id_foreign` FOREIGN KEY (`diak_id`) REFERENCES `diak` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ertekeles_tanar_id_foreign` FOREIGN KEY (`tanar_id`) REFERENCES `tanar` (`id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `kerdesek`
--
ALTER TABLE `kerdesek`
  ADD CONSTRAINT `kerdesek_tipus_id_foreign` FOREIGN KEY (`tipus_id`) REFERENCES `kerdes_tipusok` (`id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `tanar_csoport`
--
ALTER TABLE `tanar_csoport`
  ADD CONSTRAINT `tanar_csoport_csoport_id_foreign` FOREIGN KEY (`csoport_id`) REFERENCES `csoport` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `tanar_csoport_tanar_id_foreign` FOREIGN KEY (`tanar_id`) REFERENCES `tanar` (`id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `valaszok`
--
ALTER TABLE `valaszok`
  ADD CONSTRAINT `valaszok_kerdes_id_foreign` FOREIGN KEY (`kerdes_id`) REFERENCES `kerdesek` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `valaszok_tanar_id_foreign` FOREIGN KEY (`tanar_id`) REFERENCES `tanar` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
