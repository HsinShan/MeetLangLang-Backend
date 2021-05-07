-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- 主機： mll-mysql:3306
-- 產生時間： 2021 年 05 月 07 日 03:58
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
-- 資料表結構 `AnimalInfo`
--

CREATE TABLE `AnimalInfo` (
  `animal_id` int(10) NOT NULL,
  `animal_sex` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `animal_kind` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `animal_colour` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `animal_sterilization` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shelter_tel` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shelter_address` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `animal_place` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `album_file` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `animal_remark` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
  `animal_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `MesgResponse`
--

CREATE TABLE `MesgResponse` (
  `uuid` int(11) NOT NULL,
  `mesgId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `content` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `Message`
--

CREATE TABLE `Message` (
  `uuid` int(8) NOT NULL,
  `userId` int(8) NOT NULL,
  `title` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `content` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `Message`
--

INSERT INTO `Message` (`uuid`, `userId`, `title`, `time`, `content`) VALUES
(1, 1, 'Test_1', '2021-05-07 03:25:46', 'test'),
(2, 1, 'Test_2', '2021-05-07 03:26:10', 'test');

-- --------------------------------------------------------

--
-- 資料表結構 `User`
--

CREATE TABLE `User` (
  `uuid` int(8) NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ssoid` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 傾印資料表的資料 `User`
--

INSERT INTO `User` (`uuid`, `email`, `name`, `ssoid`) VALUES
(1, 'allen010301@gmail.com', '吳雨澤', NULL);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `AnimalInfo`
--
ALTER TABLE `AnimalInfo`
  ADD PRIMARY KEY (`animal_id`);

--
-- 資料表索引 `example`
--
ALTER TABLE `example`
  ADD PRIMARY KEY (`uuid`);

--
-- 資料表索引 `FavoriteMap`
--
ALTER TABLE `FavoriteMap`
  ADD PRIMARY KEY (`uuid`,`animal_id`),
  ADD KEY `animal_id` (`animal_id`);

--
-- 資料表索引 `MesgResponse`
--
ALTER TABLE `MesgResponse`
  ADD PRIMARY KEY (`uuid`),
  ADD KEY `relation_message_table` (`mesgId`),
  ADD KEY `relation_user_table` (`userId`);

--
-- 資料表索引 `Message`
--
ALTER TABLE `Message`
  ADD PRIMARY KEY (`uuid`) USING BTREE,
  ADD KEY `userId` (`userId`);

--
-- 資料表索引 `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`uuid`),
  ADD UNIQUE KEY `email` (`email`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `example`
--
ALTER TABLE `example`
  MODIFY `uuid` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `MesgResponse`
--
ALTER TABLE `MesgResponse`
  MODIFY `uuid` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `Message`
--
ALTER TABLE `Message`
  MODIFY `uuid` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `User`
--
ALTER TABLE `User`
  MODIFY `uuid` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `FavoriteMap`
--
ALTER TABLE `FavoriteMap`
  ADD CONSTRAINT `FavoriteMap_ibfk_1` FOREIGN KEY (`uuid`) REFERENCES `User` (`uuid`) ON UPDATE CASCADE,
  ADD CONSTRAINT `FavoriteMap_ibfk_2` FOREIGN KEY (`animal_id`) REFERENCES `AnimalInfo` (`animal_id`) ON UPDATE CASCADE;

--
-- 資料表的限制式 `MesgResponse`
--
ALTER TABLE `MesgResponse`
  ADD CONSTRAINT `relation_message_table` FOREIGN KEY (`mesgId`) REFERENCES `Message` (`uuid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `relation_user_table` FOREIGN KEY (`userId`) REFERENCES `User` (`uuid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 資料表的限制式 `Message`
--
ALTER TABLE `Message`
  ADD CONSTRAINT `relation User table` FOREIGN KEY (`userId`) REFERENCES `User` (`uuid`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
