CREATE DATABASE  IF NOT EXISTS `system` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `system`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: system
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `iduser` int NOT NULL AUTO_INCREMENT,
  `username` varchar(545) NOT NULL,
  `nickname` varchar(545) NOT NULL,
  `email` varchar(545) NOT NULL,
  `password` varchar(545) NOT NULL,
  `isActive` tinyint NOT NULL DEFAULT '0',
  `permission` tinyint NOT NULL DEFAULT '2',
  PRIMARY KEY (`iduser`),
  UNIQUE KEY `idusers_UNIQUE` (`iduser`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'rjnhxg','E o Duz','eduardo.c.02@hotmail.com','$2a$10$h.CWV2Sfxb6ri0KkACoY..Yiu9AYEFOP1.snhGjREyYqB/zrRhb0.',1,1),(2,'rjnhxf','E o Duzao','eduardo.c.01@hotmail.com','$2a$10$JodnfZ8.WeHmu9kas7.BS.15qOJIxE4aiCUlia0rWJJEhWQ8LraYu',1,0),(3,'rjnhxl','E o Duzaou','eduardo.c.013@hotmail.com','$2a$10$8GNyu9Wduz2ddwszjYrbeOlTCO4LK9D9Ob4P4DRB6EVysFSiNUxBK',1,2),(4,'rjnhxlf','E o Duzaosu','eduardo.c.013s@hotmail.com','$2a$10$QkYXTd3HMstUsnNbFM7PGe.caC7dFeHaXpVVRFJFHV9Nt2aNfqSUW',1,2),(5,'rjnhxd','Eduardo Cardoso Agostinetti','eduardo.c.0231@hotmail.com','$2a$10$Zg3wPdms8e3MeIX01CwSD.rK7OCqIoUQQ8gxpe7Irpj9ibdKBL792',1,2),(6,'rjnhxs','tetasnfma fds flnsm,','temnsdfns@dsflksdnf','$2a$10$ehA4lKBGcTYgodCFpQWtMurCEQOR0ZGzJ.qnRRSqy7nzQGc8eYhtu',1,2),(7,'fdklsnjsdklfnsdjk','sdhkjsdjlhj','keltjeklsfmal@tesf','$2a$10$hT2picFGnk8Q1NpQWSIyo.qgaxmYb/G.SexppApgIhMBZ7XBuL1JS',1,1),(8,'teste678','Teste678','teste678@gmail.com','$2a$10$CUhjgyh2iLIsuWt4tUySxOe8Pww8zlyK2yXx6tlLifQQ1e6SPEVQm',0,2),(9,'teste565','teste565','teste565@teste.com','$2a$10$67JtIyUbSxdu3E3CotcPluuKQkFaIXnSL2sJKMpo91kYV/lxYZmYC',1,2);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-28 12:41:28
