-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- 主機： mll-mysql:3306
-- 產生時間： 2021 年 04 月 09 日 17:25
-- 伺服器版本： 5.6.51
-- PHP 版本： 7.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `mllapp`
--

-- --------------------------------------------------------

--
-- 資料表結構 `example`
--

CREATE TABLE `example` (
  `uuid` int(11) NOT NULL,
  `name` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `timestamp` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `FavoriteMap`
--

CREATE TABLE `FavoriteMap` (
  `uuid` int(8) NOT NULL,
  `petId` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `PetInfo`
--

CREATE TABLE `PetInfo` (
  `petId` int(10) NOT NULL,
  `sex` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `age` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `kind` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `picture` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `user`
--

CREATE TABLE `user` (
  `uuid` int(8) NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sso_id` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `example`
--
ALTER TABLE `example`
  ADD PRIMARY KEY (`uuid`);

--
-- 資料表索引 `FavoriteMap`
--
ALTER TABLE `FavoriteMap`
  ADD PRIMARY KEY (`uuid`,`petId`),
  ADD KEY `petId` (`petId`);

--
-- 資料表索引 `PetInfo`
--
ALTER TABLE `PetInfo`
  ADD PRIMARY KEY (`petId`);

--
-- 資料表索引 `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`uuid`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `example`
--
ALTER TABLE `example`
  MODIFY `uuid` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `user`
--
ALTER TABLE `user`
  MODIFY `uuid` int(8) NOT NULL AUTO_INCREMENT;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `FavoriteMap`
--
ALTER TABLE `FavoriteMap`
  ADD CONSTRAINT `FavoriteMap_ibfk_1` FOREIGN KEY (`uuid`) REFERENCES `user` (`uuid`) ON UPDATE CASCADE,
  ADD CONSTRAINT `FavoriteMap_ibfk_2` FOREIGN KEY (`petId`) REFERENCES `PetInfo` (`petId`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
