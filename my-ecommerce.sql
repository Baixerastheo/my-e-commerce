-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : lun. 01 déc. 2025 à 22:05
-- Version du serveur : 9.1.0
-- Version de PHP : 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `my-ecommerce`
--

-- --------------------------------------------------------

--
-- Structure de la table `analytics_events`
--

DROP TABLE IF EXISTS `analytics_events`;
CREATE TABLE IF NOT EXISTS `analytics_events` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `eventType` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sessionId` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `page` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `productId` int DEFAULT NULL,
  `productName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `productPrice` decimal(10,2) DEFAULT NULL,
  `productCategory` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `cartValue` decimal(10,2) DEFAULT NULL,
  `searchTerm` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `searchResults` int DEFAULT NULL,
  `metadata` json DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `analytics_events_eventType_idx` (`eventType`),
  KEY `analytics_events_productId_idx` (`productId`),
  KEY `analytics_events_createdAt_idx` (`createdAt`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `analytics_events`
--

INSERT INTO `analytics_events` (`id`, `eventType`, `sessionId`, `page`, `productId`, `productName`, `productPrice`, `productCategory`, `quantity`, `cartValue`, `searchTerm`, `searchResults`, `metadata`, `createdAt`) VALUES
('54c24f16b6305bb9', 'product_view', 'session_1763896575705_g25a6b4f8', '/product/1', 1, 'Laptop Pro 14\"', 1200.00, 'Ordinateurs portables', NULL, NULL, NULL, NULL, 'null', '2025-11-27 21:41:41.972'),
('4c24f16b6305bb90', 'product_view', 'session_1763896575705_g25a6b4f8', '/product/7', 7, 'Pro Gamer 15\"', 2000.00, 'Ordinateurs portables', NULL, NULL, NULL, NULL, 'null', '2025-11-27 21:41:41.975'),
('c24f16b6305bb909', 'product_view', 'session_1763896575705_g25a6b4f8', '/product/9', 9, 'Creator 16\"', 1800.00, 'Ordinateurs portables', NULL, NULL, NULL, NULL, 'null', '2025-11-27 21:41:41.976'),
('24f16b6305bb909b', 'product_view', 'session_1763896575705_g25a6b4f8', '/product/10', 10, 'BusinessPro 15\"', 1400.00, 'Ordinateurs portables', NULL, NULL, NULL, NULL, 'null', '2025-11-27 21:41:41.977'),
('4f16b6305bb909b8', 'product_view', 'session_1763896575705_g25a6b4f8', '/product/11', 11, 'MacBook Pro 14\" M3', 2199.00, 'Ordinateurs portables', NULL, NULL, NULL, NULL, 'null', '2025-11-27 21:41:41.978'),
('f16b6305bb909b8c', 'product_view', 'session_1763896575705_g25a6b4f8', '/product/11', 11, 'MacBook Pro 14\" M3', 2199.00, 'Ordinateurs portables', NULL, NULL, NULL, NULL, 'null', '2025-11-27 21:41:41.979'),
('607a75204ea19325', 'product_view', 'session_1764279804926_pdxvq26xg', '/product/1', 1, 'Laptop Pro 14\"', 1200.00, 'Ordinateurs portables', NULL, NULL, NULL, NULL, NULL, '2025-11-27 21:43:29.404'),
('07a75204ea193252', 'product_view', 'session_1764279804926_pdxvq26xg', '/product/2', 2, 'UltraBook X15', 1500.00, 'Ordinateurs portables', NULL, NULL, NULL, NULL, NULL, '2025-11-27 21:43:32.196'),
('7a75204ea193252b', 'product_view', 'session_1764279804926_pdxvq26xg', '/product/6', 6, 'ZenBook Flip 13\"', 1300.00, 'Ordinateurs portables', NULL, NULL, NULL, NULL, NULL, '2025-11-27 21:43:41.297'),
('a75204ea193252b5', 'product_view', 'session_1764279804926_pdxvq26xg', '/product/9', 9, 'Creator 16\"', 1800.00, 'Ordinateurs portables', NULL, NULL, NULL, NULL, NULL, '2025-11-27 21:44:17.431'),
('f87c59641c74fc5b', 'product_view', 'session_1764281290916_aj8923u0g', '/product/1', 1, 'Laptop Pro 14\"', 1200.00, 'Ordinateurs portables', NULL, NULL, NULL, NULL, 'null', '2025-11-27 22:20:46.496'),
('665a81871c52f543', 'product_view', 'session_1764626206835_z0uirn1c5', '/product/1', 1, 'Laptop Pro 14\"', 1200.00, 'Ordinateurs portables', NULL, NULL, NULL, NULL, 'null', '2025-12-01 21:58:52.659');

-- --------------------------------------------------------

--
-- Structure de la table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `category` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `specs` json DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `category`, `image`, `description`, `specs`, `createdAt`, `updatedAt`) VALUES
(1, 'Laptop Pro 14\"', 1200.00, 'Ordinateurs portables', 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&h=600&fit=crop', 'Un ultrabook puissant pour les professionnels en déplacement.', '[\"Intel Core i7 12ᵉ génération\", \"16 Go RAM DDR5\", \"512 Go SSD NVMe\", \"Écran 14\\\" IPS 1440p\", \"Batterie 12h\"]', '2025-11-27 21:41:41.940', '2025-11-27 21:41:41.940'),
(2, 'UltraBook X15', 1500.00, 'Ordinateurs portables', 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop', 'Ultrabook ultra-fin avec performances haut de gamme.', '[\"Intel Core i7 13ᵉ génération\", \"16 Go RAM LPDDR5\", \"1 To SSD NVMe\", \"Écran 15.6\\\" OLED 4K\", \"Wi-Fi 6E\"]', '2025-11-27 21:41:41.961', '2025-11-27 21:41:41.961'),
(3, 'Notebook Lite 13\"', 900.00, 'Ordinateurs portables', 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop', 'Compact, léger et parfait pour une utilisation quotidienne.', '[\"Intel Core i5 12ᵉ génération\", \"8 Go RAM DDR4\", \"256 Go SSD\", \"Écran 13.3\\\" Full HD\", \"1.2 kg\"]', '2025-11-27 21:41:41.963', '2025-11-27 21:41:41.963'),
(4, 'Gaming Beast 17\"', 2200.00, 'Ordinateurs portables', 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&h=600&fit=crop', 'Machine de guerre pour les gamers exigeants.', '[\"Intel Core i9 13ᵉ génération\", \"32 Go RAM DDR5\", \"1 To SSD NVMe\", \"NVIDIA RTX 4080 Laptop\", \"Écran 17\\\" 240Hz\"]', '2025-11-27 21:41:41.964', '2025-11-27 21:41:41.964'),
(5, 'TravelMate 14\"', 1100.00, 'Ordinateurs portables', 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop', 'Conçu pour les voyageurs avec une autonomie record.', '[\"Intel Core i5 13ᵉ génération\", \"16 Go RAM\", \"512 Go SSD\", \"Écran 14\\\" Full HD\", \"Autonomie 15h\"]', '2025-11-27 21:41:41.965', '2025-11-27 21:41:41.965'),
(6, 'ZenBook Flip 13\"', 1300.00, 'Ordinateurs portables', 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&h=600&fit=crop', 'Un convertible 2-en-1 polyvalent et haut de gamme.', '[\"Intel Core i7 12ᵉ génération\", \"16 Go RAM\", \"512 Go SSD\", \"Écran tactile 13.3\\\" OLED\", \"Rotation 360°\"]', '2025-11-27 21:41:41.966', '2025-11-27 21:41:41.966'),
(7, 'Pro Gamer 15\"', 2000.00, 'Ordinateurs portables', 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&h=600&fit=crop', 'Un portable gaming performant pour des FPS stables en 1440p.', '[\"AMD Ryzen 9 7900HS\", \"32 Go RAM DDR5\", \"1 To SSD\", \"NVIDIA RTX 4070 Laptop\", \"Écran 15\\\" QHD 165Hz\"]', '2025-11-27 21:41:41.967', '2025-11-27 21:41:41.967'),
(8, 'StudentBook 12\"', 800.00, 'Ordinateurs portables', 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop', 'Parfait pour étudiants : léger, solide et économique.', '[\"Intel Core i3 11ᵉ génération\", \"8 Go RAM\", \"256 Go SSD\", \"Écran 12.5\\\" Full HD\", \"Charge USB-C\"]', '2025-11-27 21:41:41.967', '2025-11-27 21:41:41.967'),
(9, 'Creator 16\"', 1800.00, 'Ordinateurs portables', 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&h=600&fit=crop', 'Optimisé pour les créateurs photo/vidéo.', '[\"Intel Core i7 13ᵉ génération\", \"32 Go RAM\", \"1 To SSD\", \"NVIDIA RTX 4060\", \"Écran 16\\\" 4K HDR\"]', '2025-11-27 21:41:41.969', '2025-11-27 21:41:41.969'),
(10, 'BusinessPro 15\"', 1400.00, 'Ordinateurs portables', 'https://images.unsplash.com/photo-1593642633279-1796119d5482?w=800&h=600&fit=crop', 'Le choix idéal pour les professionnels et les entreprises.', '[\"Intel Core i7 12ᵉ génération\", \"16 Go RAM\", \"512 Go SSD\", \"Écran 15.6\\\" Full HD\", \"Clavier rétro-éclairé\"]', '2025-11-27 21:41:41.969', '2025-11-27 21:41:41.969'),
(11, 'MacBook Pro 14\" M3', 2199.00, 'Ordinateurs portables', 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=600&fit=crop', 'MacBook Pro 14 pouces avec puce Apple M3, parfait pour les professionnels créatifs et développeurs.', '[\"Apple M3 (8 cœurs CPU, 10 cœurs GPU)\", \"18 Go RAM unifiée\", \"512 Go SSD\", \"Écran Liquid Retina XDR 14.2\\\"\", \"Autonomie jusqu\'à 18h\"]', '2025-11-27 21:41:41.970', '2025-11-27 21:41:41.970'),
(12, 'Lenovo ThinkPad X1 Carbon Gen 11', 1899.00, 'Ordinateurs portables', 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&h=600&fit=crop', 'Ultrabook professionnel ultra-léger avec une autonomie exceptionnelle, idéal pour les professionnels en déplacement.', '[\"Intel Core i7-1355U (13ᵉ génération)\", \"16 Go RAM LPDDR5\", \"512 Go SSD PCIe Gen4\", \"Écran 14\\\" WUXGA IPS 400 nits\", \"Poids 1.12 kg, autonomie 15h\"]', '2025-11-27 21:41:41.971', '2025-11-27 21:41:41.971');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_username_key` (`username`),
  UNIQUE KEY `users_email_key` (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
