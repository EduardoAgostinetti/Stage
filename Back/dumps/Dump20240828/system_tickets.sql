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
-- Table structure for table `tickets`
--

DROP TABLE IF EXISTS `tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tickets` (
  `idtickets` int NOT NULL AUTO_INCREMENT,
  `iduser` int NOT NULL,
  `local` varchar(545) NOT NULL,
  `priority` varchar(545) NOT NULL,
  `task` varchar(545) NOT NULL,
  `comments` varchar(545) NOT NULL,
  `solution` varchar(545) NOT NULL DEFAULT 'Em espera',
  `status` varchar(545) NOT NULL DEFAULT 'Em espera',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `closed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`idtickets`),
  UNIQUE KEY `idtickets_UNIQUE` (`idtickets`),
  KEY `FK_iduserFROMtickets_idx` (`iduser`),
  CONSTRAINT `FK_iduserFROMtickets` FOREIGN KEY (`iduser`) REFERENCES `users` (`iduser`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tickets`
--

LOCK TABLES `tickets` WRITE;
/*!40000 ALTER TABLE `tickets` DISABLE KEYS */;
INSERT INTO `tickets` VALUES (1,5,'Obras e Engenharia','Média','tarefa teste','comentario teste','fechados psf paofdafsf','Fechado','2024-08-02 21:13:11','2024-08-22 21:02:37'),(2,5,'Saúde (Posto Raul Garcia)','Alta','teste 2','teste 2','Servico finalizado','Fechado','2024-08-02 21:13:37','2024-08-02 21:17:35'),(3,5,'Administração e Recursos Humanos','Baixa','teste 3','comentario 3','Em espera','Em progresso','2024-08-02 21:15:39',NULL),(4,5,'Licitações','Média','tushfsjkdlfji','ofdisfhdskjndfamlbkdjfbnlidkjnnjdhfjkgdhfglkjdfnlkdf','Em espera','Em espera','2024-08-21 19:44:33',NULL),(5,6,'Compras','Alta','fsdklhskdugjhsdk ghskjdg hskjdgh fdjsklgh sjkdfahgdskag sdag fsdklhskdugjhsdk ghskjdg hskjdgh fdjsklgh sjkdfahgdskag sdag fsdklhskdugjhsdk ghskjdg hskjdgh fdjsklgh sjkdfahgdskag sdag fsdklhskdugjhsdk ghskjdg hskjdgh fdjsklgh sjkdfahgdskag sdag fsdklhskdugjhsdk ghskjdg hskjdgh fdjsklgh sjkdfahgdskag sdag fsdklhskdugjhsdk ghskjdg hskjdgh fdjsklgh sjkdfahgdskag sdag fsdklhskdugjhsdk ghskjdg hskjdgh fdjsklgh sjkdfahgdskag sdag fsdklhskdugjhsdk ghskjdg hskjdgh fdjsklgh sjkdfahgdskag sdag fsdklhskdugjhsdk ghskjdg hskjdgh fdjsklgh sjkdfahgdskag ','fsdklhskdugjhsdk ghskjdg hskjdgh fdjsklgh sjkdfahgdskag sdag fsdklhskdugjhsdk ghskjdg hskjdgh fdjsklgh sjkdfahgdskag sdag fsdklhskdugjhsdk ghskjdg hskjdgh fdjsklgh sjkdfahgdskag sdag fsdklhskdugjhsdk ghskjdg hskjdgh fdjsklgh sjkdfahgdskag sdag fsdklhskdugjhsdk ghskjdg hskjdgh fdjsklgh sjkdfahgdskag sdag fsdklhskdugjhsdk ghskjdg hskjdgh fdjsklgh sjkdfahgdskag sdag fsdklhskdugjhsdk ghskjdg hskjdgh fdjsklgh sjkdfahgdskag sdag fsdklhskdugjhsdk ghskjdg hskjdgh fdjsklgh sjkdfahgdskag sdag fsdklhskdugjhsdk ghskjdg hskjdgh fdjsklgh sjkdfahgdskag ','Em espera','Em espera','2024-08-22 21:45:45',NULL),(6,6,'Recursos Humanos','Baixa','tregrfdsgfdgdfsgdsfgdfgfd','dasdsadasdas','Em espera','Em espera','2024-08-22 21:48:03',NULL),(7,6,'Compras','Baixa','gfdgldfjngjfdlkagnkldsfgjfdkgdnflgdfgadfgad','','Em espera','Em espera','2024-08-22 21:48:41',NULL);
/*!40000 ALTER TABLE `tickets` ENABLE KEYS */;
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
