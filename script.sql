CREATE DATABASE  IF NOT EXISTS `ivstitia_legal` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ivstitia_legal`;
-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: 192.168.100.157    Database: ivstitia_legal
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `actos`
--

DROP TABLE IF EXISTS `actos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `actos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `id_registro` int NOT NULL,
  `tributos_general` json NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`),
  KEY `fk_acto_registro_idx` (`id_registro`),
  CONSTRAINT `fk_acto_registro` FOREIGN KEY (`id_registro`) REFERENCES `registros` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actos`
--

LOCK TABLES `actos` WRITE;
/*!40000 ALTER TABLE `actos` DISABLE KEYS */;
INSERT INTO `actos` VALUES (1,'Inscripción de Aeronave',1,'{\"fiscal\": [{\"id\": 1, \"hasta\": 25000, \"monto\": 12.5}, {\"id\": 2, \"hasta\": 75000, \"monto\": 25}, {\"id\": 3, \"hasta\": 100000, \"monto\": 31.25}, {\"id\": 4, \"hasta\": 250000, \"monto\": 62.5}, {\"id\": 5, \"hasta\": 500000, \"monto\": 125}, {\"id\": 6, \"hasta\": 1000000, \"monto\": 156.25}, {\"id\": 7, \"hasta\": 1500000, \"monto\": 312.5}, {\"id\": 8, \"hasta\": 0, \"monto\": 625}], \"abogado\": [{\"id\": 1, \"hasta\": 250000, \"monto\": 0}, {\"id\": 2, \"hasta\": 1000000, \"monto\": 1100}, {\"id\": 3, \"hasta\": 5000000, \"monto\": 2200}, {\"id\": 4, \"hasta\": 25000000, \"monto\": 5500}, {\"id\": 5, \"hasta\": 50000000, \"monto\": 11000}, {\"id\": 6, \"hasta\": 100000000, \"monto\": 16500}, {\"id\": 7, \"hasta\": 500000000, \"monto\": 27500}, {\"id\": 8, \"hasta\": 0, \"monto\": 55000}], \"agrario\": \"3.00\", \"archivo\": [{\"id\": 1, \"hasta\": 100000, \"monto\": 10}, {\"id\": 2, \"hasta\": 0, \"monto\": 20}], \"cruzRoja\": 500, \"registro\": \"5.00\", \"traspaso\": \"1.50\", \"municipal\": \"0.00\", \"honorarios\": [{\"id\": 1, \"monto\": \"60500.00\", \"porcentaje\": \"0.00\"}, {\"id\": 2, \"monto\": \"11000000.00\", \"porcentaje\": \"2.00\"}, {\"id\": 3, \"monto\": \"16500000.00\", \"porcentaje\": \"1.50\"}, {\"id\": 4, \"monto\": \"33000000.00\", \"porcentaje\": \"1.25\"}, {\"id\": 5, \"monto\": \"0.00\", \"porcentaje\": \"1.00\"}]}'),(2,'Traspaso de Inmuebles',3,'null'),(9,'4',1,'null'),(11,'1234',1,'null'),(12,'sexy',1,'{\"fiscal\": [{\"id\": 1, \"hasta\": 25000, \"monto\": 12.5}, {\"id\": 2, \"hasta\": 75000, \"monto\": 25}, {\"id\": 3, \"hasta\": 100000, \"monto\": 31.25}, {\"id\": 4, \"hasta\": 250000, \"monto\": 62.5}, {\"id\": 5, \"hasta\": 500000, \"monto\": 125}, {\"id\": 6, \"hasta\": 1000000, \"monto\": 156.25}, {\"id\": 7, \"hasta\": 1500000, \"monto\": 312.5}, {\"id\": 8, \"hasta\": 0, \"monto\": 625}], \"abogado\": [{\"id\": 1, \"hasta\": 250000, \"monto\": 0}, {\"id\": 2, \"hasta\": 1000000, \"monto\": 1100}, {\"id\": 3, \"hasta\": 5000000, \"monto\": 2200}, {\"id\": 4, \"hasta\": 25000000, \"monto\": 5500}, {\"id\": 5, \"hasta\": 50000000, \"monto\": 11000}, {\"id\": 6, \"hasta\": 100000000, \"monto\": 16500}, {\"id\": 7, \"hasta\": 500000000, \"monto\": 27500}, {\"id\": 8, \"hasta\": 0, \"monto\": 55000}], \"agrario\": \"3.00\", \"archivo\": [{\"id\": 1, \"hasta\": 100000, \"monto\": 10}, {\"id\": 2, \"hasta\": 0, \"monto\": 20}], \"cruzRoja\": 500, \"registro\": \"5.00\", \"traspaso\": \"1.50\", \"municipal\": \"0.00\", \"honorarios\": [{\"id\": 1, \"monto\": \"60500.00\", \"porcentaje\": \"0.00\"}, {\"id\": 2, \"monto\": \"11000000.00\", \"porcentaje\": \"2.00\"}, {\"id\": 3, \"monto\": \"16500000.00\", \"porcentaje\": \"1.50\"}, {\"id\": 4, \"monto\": \"33000000.00\", \"porcentaje\": \"1.25\"}, {\"id\": 5, \"monto\": \"0.00\", \"porcentaje\": \"1.00\"}], \"faunaSilvestre\": 1125.5, \"parquesNacionales\": 500}'),(14,'ZULU',15,'{\"fiscal\": [{\"id\": 1, \"hasta\": 25000, \"monto\": 12.5}, {\"id\": 2, \"hasta\": 75000, \"monto\": 25}, {\"id\": 3, \"hasta\": 100000, \"monto\": 31.25}, {\"id\": 4, \"hasta\": 250000, \"monto\": 62.5}, {\"id\": 5, \"hasta\": 500000, \"monto\": 125}, {\"id\": 6, \"hasta\": 1000000, \"monto\": 156.25}, {\"id\": 7, \"hasta\": 1500000, \"monto\": 312.5}, {\"id\": 8, \"hasta\": 0, \"monto\": 625}], \"abogado\": [{\"id\": 1, \"hasta\": 250000, \"monto\": 0}, {\"id\": 2, \"hasta\": 1000000, \"monto\": 1100}, {\"id\": 3, \"hasta\": 5000000, \"monto\": 2200}, {\"id\": 4, \"hasta\": 25000000, \"monto\": 5500}, {\"id\": 5, \"hasta\": 50000000, \"monto\": 11000}, {\"id\": 6, \"hasta\": 100000000, \"monto\": 16500}, {\"id\": 7, \"hasta\": 500000000, \"monto\": 27500}, {\"id\": 8, \"hasta\": 0, \"monto\": 55000}], \"agrario\": \"3.00\", \"archivo\": [{\"id\": 1, \"hasta\": 100000, \"monto\": 10}, {\"id\": 2, \"hasta\": 0, \"monto\": 20}], \"cruzRoja\": 500, \"registro\": \"5.00\", \"traspaso\": \"1.50\", \"municipal\": \"0.00\", \"honorarios\": [{\"id\": 1, \"monto\": \"60500.00\", \"porcentaje\": \"0.00\"}, {\"id\": 2, \"monto\": \"11000000.00\", \"porcentaje\": \"2.00\"}, {\"id\": 3, \"monto\": \"16500000.00\", \"porcentaje\": \"1.50\"}, {\"id\": 4, \"monto\": \"33000000.00\", \"porcentaje\": \"1.25\"}, {\"id\": 5, \"monto\": \"0.00\", \"porcentaje\": \"1.00\"}], \"faunaSilvestre\": 1125.5, \"parquesNacionales\": 500}');
/*!40000 ALTER TABLE `actos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `caso_cliente`
--

DROP TABLE IF EXISTS `caso_cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `caso_cliente` (
  `id` int NOT NULL AUTO_INCREMENT,
  `caso_id` int NOT NULL,
  `cliente_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `caso_id_idx` (`caso_id`),
  KEY `cliente_id_idx` (`cliente_id`),
  CONSTRAINT `cliente_id` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`),
  CONSTRAINT `id_caso` FOREIGN KEY (`caso_id`) REFERENCES `casos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `caso_cliente`
--

LOCK TABLES `caso_cliente` WRITE;
/*!40000 ALTER TABLE `caso_cliente` DISABLE KEYS */;
/*!40000 ALTER TABLE `caso_cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `casos`
--

DROP TABLE IF EXISTS `casos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `casos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `despacho` varchar(45) NOT NULL,
  `tipo_proceso_id` int NOT NULL,
  `estado_id` int NOT NULL,
  `lugar_estado_proceso_id` int NOT NULL,
  `usuario_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `tipo_proceso_id_idx` (`tipo_proceso_id`),
  KEY `estado_id_idx` (`estado_id`),
  KEY `lugar_estado_proceso_id_idx` (`lugar_estado_proceso_id`),
  KEY `id_usuario_idx` (`usuario_id`),
  CONSTRAINT `estado_id` FOREIGN KEY (`estado_id`) REFERENCES `estado` (`id`),
  CONSTRAINT `id_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `lugar_estado_proceso_id` FOREIGN KEY (`lugar_estado_proceso_id`) REFERENCES `lugar_estado_proceso` (`id`),
  CONSTRAINT `tipo_proceso_id` FOREIGN KEY (`tipo_proceso_id`) REFERENCES `tipo_proceso` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `casos`
--

LOCK TABLES `casos` WRITE;
/*!40000 ALTER TABLE `casos` DISABLE KEYS */;
/*!40000 ALTER TABLE `casos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `cedula` varchar(15) NOT NULL,
  `correo` varchar(45) NOT NULL,
  `numero_fisico` varchar(15) DEFAULT NULL,
  `numero_movil` varchar(15) NOT NULL,
  `direccion` varchar(200) NOT NULL,
  `usuario_id` int NOT NULL,
  `tipo_cedula_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `cedula_UNIQUE` (`cedula`),
  KEY `usuario_id_idx` (`usuario_id`),
  KEY `tipo_cedula_id_idx` (`tipo_cedula_id`),
  CONSTRAINT `tipo_cedula_id` FOREIGN KEY (`tipo_cedula_id`) REFERENCES `tipo_cedula` (`id`),
  CONSTRAINT `usuario_id` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estado`
--

DROP TABLE IF EXISTS `estado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estado` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado`
--

LOCK TABLES `estado` WRITE;
/*!40000 ALTER TABLE `estado` DISABLE KEYS */;
/*!40000 ALTER TABLE `estado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lugar_estado_proceso`
--

DROP TABLE IF EXISTS `lugar_estado_proceso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lugar_estado_proceso` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lugar_estado_proceso`
--

LOCK TABLES `lugar_estado_proceso` WRITE;
/*!40000 ALTER TABLE `lugar_estado_proceso` DISABLE KEYS */;
/*!40000 ALTER TABLE `lugar_estado_proceso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notas_casos`
--

DROP TABLE IF EXISTS `notas_casos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notas_casos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nota` varchar(1000) NOT NULL,
  `caso_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `caso_id_idx` (`caso_id`),
  CONSTRAINT `caso_id` FOREIGN KEY (`caso_id`) REFERENCES `casos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notas_casos`
--

LOCK TABLES `notas_casos` WRITE;
/*!40000 ALTER TABLE `notas_casos` DISABLE KEYS */;
/*!40000 ALTER TABLE `notas_casos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registros`
--

DROP TABLE IF EXISTS `registros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registros` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registros`
--

LOCK TABLES `registros` WRITE;
/*!40000 ALTER TABLE `registros` DISABLE KEYS */;
INSERT INTO `registros` VALUES (1,'Aeronaves'),(2,'Asociaciones'),(3,'Bienes Inmuebles'),(4,'Catastro Nacional'),(5,'Certificaciones'),(6,'Concesiones'),(7,'Derechos de Autor'),(8,'DGTD Timbre Fiscal'),(9,'Entero de Timbres'),(10,'Impuesto Tributación Directa'),(11,'Marca Comercial'),(12,'Marcas de Ganado'),(13,'Mercantil y Personas'),(14,'Ministerio de Trabajo S.S.'),(15,'Patentes'),(16,'Placas'),(17,'Prendas'),(18,'Registro de Busques o Naval'),(19,'Vehículos');
/*!40000 ALTER TABLE `registros` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_cedula`
--

DROP TABLE IF EXISTS `tipo_cedula`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_cedula` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipo` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `tipo_UNIQUE` (`tipo`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_cedula`
--

LOCK TABLES `tipo_cedula` WRITE;
/*!40000 ALTER TABLE `tipo_cedula` DISABLE KEYS */;
INSERT INTO `tipo_cedula` VALUES (1,'Física'),(2,'Jurídica');
/*!40000 ALTER TABLE `tipo_cedula` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_proceso`
--

DROP TABLE IF EXISTS `tipo_proceso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_proceso` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_proceso`
--

LOCK TABLES `tipo_proceso` WRITE;
/*!40000 ALTER TABLE `tipo_proceso` DISABLE KEYS */;
/*!40000 ALTER TABLE `tipo_proceso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tributos_honorarios`
--

DROP TABLE IF EXISTS `tributos_honorarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tributos_honorarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `registro` decimal(10,2) DEFAULT NULL,
  `agrario` decimal(10,2) DEFAULT NULL,
  `fiscal` json DEFAULT NULL,
  `archivo` json DEFAULT NULL,
  `abogado` json DEFAULT NULL,
  `municipal` decimal(10,2) DEFAULT NULL,
  `traspaso` decimal(10,2) DEFAULT NULL,
  `parques_nacionales` decimal(10,2) DEFAULT NULL,
  `fauna_silvestre` decimal(10,2) DEFAULT NULL,
  `cruz_roja` decimal(10,2) DEFAULT NULL,
  `honorarios` json DEFAULT NULL,
  `id_acto` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `id_acto_UNIQUE` (`id_acto`),
  CONSTRAINT `fk_tributos_actos` FOREIGN KEY (`id_acto`) REFERENCES `actos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tributos_honorarios`
--

LOCK TABLES `tributos_honorarios` WRITE;
/*!40000 ALTER TABLE `tributos_honorarios` DISABLE KEYS */;
INSERT INTO `tributos_honorarios` VALUES (1,5.00,3.00,'[{\"id\": 1, \"hasta\": 25000, \"monto\": 12.5}, {\"id\": 2, \"hasta\": 75000, \"monto\": 25}, {\"id\": 3, \"hasta\": 100000, \"monto\": 31.25}, {\"id\": 4, \"hasta\": 250000, \"monto\": 62.5}, {\"id\": 5, \"hasta\": 500000, \"monto\": 125}, {\"id\": 6, \"hasta\": 1000000, \"monto\": 156.25}, {\"id\": 7, \"hasta\": 1500000, \"monto\": 312.5}, {\"id\": 8, \"hasta\": 0, \"monto\": 625}]','[{\"id\": 1, \"hasta\": 100000, \"monto\": 10}, {\"id\": 2, \"hasta\": 0, \"monto\": 20}]','[{\"id\": 1, \"hasta\": 250000, \"monto\": 0}, {\"id\": 2, \"hasta\": 1000000, \"monto\": 1100}, {\"id\": 3, \"hasta\": 5000000, \"monto\": 2200}, {\"id\": 4, \"hasta\": 25000000, \"monto\": 5500}, {\"id\": 5, \"hasta\": 50000000, \"monto\": 11000}, {\"id\": 6, \"hasta\": 100000000, \"monto\": 16500}, {\"id\": 7, \"hasta\": 500000000, \"monto\": 27500}, {\"id\": 8, \"hasta\": 0, \"monto\": 55000}]',0.00,1.50,NULL,NULL,NULL,'[{\"id\": 1, \"monto\": \"60500.00\", \"porcentaje\": \"0.00\"}, {\"id\": 2, \"monto\": \"11000000.00\", \"porcentaje\": \"2.00\"}, {\"id\": 3, \"monto\": \"16500000.00\", \"porcentaje\": \"1.50\"}, {\"id\": 4, \"monto\": \"33000000.00\", \"porcentaje\": \"1.25\"}, {\"id\": 5, \"monto\": \"0.00\", \"porcentaje\": \"1.00\"}]',1);
/*!40000 ALTER TABLE `tributos_honorarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `correo` varchar(45) NOT NULL,
  `contrasena` varchar(60) NOT NULL,
  `administrador` tinyint NOT NULL DEFAULT '0',
  `contrasena_configurada` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `correo_electronico_UNIQUE` (`correo`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'cvalencianou@gmail.com','$2b$10$8x6myfFFiyUz1r19YE9gtOTmoTvqxmyic6qK7Za6KA99ZP7PFJMGq',1,1),(2,'pfallas99@gmail.com','$2b$10$cAX98n8RSKxU7BS6fFBzQOSzsz.aHkLyHapgLEcaX0e2ZqiMPyihO',1,1);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'ivstitia_legal'
--

--
-- Dumping routines for database 'ivstitia_legal'
--
/*!50003 DROP PROCEDURE IF EXISTS `actos_crear` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `actos_crear`(par_nombre VARCHAR(45), par_id_registro INT, par_tribs JSON)
BEGIN
INSERT INTO actos (nombre, id_registro, tributos_general) VALUES (par_nombre, par_id_registro, par_tribs) ;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `actos_eliminar_por_id` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `actos_eliminar_por_id`(par_id INT)
BEGIN
DELETE FROM actos WHERE id = par_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `actos_obtener_por_id_registro` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `actos_obtener_por_id_registro`(par_id INT)
BEGIN
SELECT id, nombre FROM actos WHERE id_registro = par_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `actos_obtener_tributos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `actos_obtener_tributos`(par_id INT)
BEGIN
SELECT tributos_general FROM actos WHERE id = par_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `clientes_actualizar` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `clientes_actualizar`(par_cliente_id int, par_usuario_id int, par_nombre varchar(100), par_cedula varchar(15), par_correo varchar(45), par_numero_fisico varchar(15), par_numero_movil varchar(15), par_direccion varchar(200), par_tipo_cedula_id int)
BEGIN
UPDATE clientes
SET usuario_id = par_usuario_id, nombre = par_nombre, cedula = par_cedula, correo = par_correo, numero_fisico = par_numero_fisico, numero_movil = par_numero_movil, direccion = par_direccion, usuario_id = par_usuario_id, tipo_cedula_id = par_tipo_cedula_id
WHERE id = par_cliente_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `clientes_filtrar` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `clientes_filtrar`(par_usuario_id int, par_dato_cliente varchar(200))
BEGIN
SELECT clientes.id, nombre, cedula, correo, numero_fisico, numero_movil, direccion, tipo_cedula_id FROM clientes 
INNER JOIN tipo_cedula ON clientes.tipo_cedula_id = tipo_cedula.id
WHERE usuario_id = par_usuario_id && (correo LIKE CONCAT('%', par_dato_cliente, '%') || cedula LIKE CONCAT('%', par_dato_cliente, '%') || nombre LIKE CONCAT('%', par_dato_cliente, '%') || numero_fisico LIKE CONCAT('%', par_dato_cliente, '%') || numero_movil LIKE CONCAT('%', par_dato_cliente, '%') || direccion LIKE CONCAT('%', par_dato_cliente, '%') || tipo_cedula_id LIKE CONCAT('%', par_dato_cliente, '%'));
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `clientes_obtener` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `clientes_obtener`(par_usuario_id int)
BEGIN
SELECT clientes.id, nombre, cedula, correo, numero_fisico, numero_movil, direccion, tipo_cedula_id, tipo FROM clientes 
INNER JOIN tipo_cedula ON clientes.tipo_cedula_id = tipo_cedula.id
WHERE usuario_id = par_usuario_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `cliente_buscar_por_cedula` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `cliente_buscar_por_cedula`(par_usuario_id int, par_cedula varchar(15))
BEGIN
	SELECT id, cedula FROM clientes WHERE usuario_id = par_usuario_id && cedula = par_cedula;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `cliente_crear` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `cliente_crear`(par_nombre varchar(100), par_cedula varchar(15), par_correo varchar(45), par_numero_fisico varchar(15), par_numero_movil varchar(15), par_direccion varchar(200), par_usuario_id int, par_tipo_cedula_id int)
BEGIN
INSERT INTO clientes(nombre, cedula, correo, numero_fisico, numero_movil, direccion, usuario_id, tipo_cedula_id) VALUES (par_nombre, par_cedula, par_correo, par_numero_fisico, par_numero_movil, par_direccion, par_usuario_id, par_tipo_cedula_id);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `registros_crear` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `registros_crear`(par_nombre VARCHAR(45))
BEGIN
INSERT INTO registros (nombre) VALUES (par_nombre);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `registros_obtener_todos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `registros_obtener_todos`()
BEGIN
SELECT id, nombre FROM registros;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `tributos_obtener_por_id_acto` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `tributos_obtener_por_id_acto`(par_id INT)
BEGIN
SELECT id, registro, agrario, fiscal, archivo, abogado, municipal, traspaso, honorarios FROM tributos WHERE id_acto = par_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `usuarios_actualizar` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `usuarios_actualizar`(par_id INT, par_correo VARCHAR(45), par_administrador INT)
BEGIN
UPDATE usuarios SET correo = par_correo, administrador = par_administrador WHERE id = par_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `usuarios_buscar_por_correo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `usuarios_buscar_por_correo`(par_correo VARCHAR(45))
BEGIN
SELECT id, correo FROM usuarios WHERE correo = par_correo;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `usuarios_buscar_por_id` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `usuarios_buscar_por_id`(par_id INT)
BEGIN
SELECT id FROM usuarios WHERE id = par_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `usuarios_cambiar_contrasena` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `usuarios_cambiar_contrasena`(par_id INT, par_contrasena VARCHAR(60))
BEGIN
UPDATE usuarios SET contrasena = par_contrasena, contrasena_configurada = 1 WHERE id = par_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `usuarios_eliminar_por_id` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `usuarios_eliminar_por_id`(par_id INT)
BEGIN
DELETE FROM clientes WHERE usuario_id = par_id;
DELETE FROM usuarios WHERE id = par_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `usuarios_obtener_todos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `usuarios_obtener_todos`()
BEGIN
SELECT id, correo, administrador FROM usuarios;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `usuarios_registrar` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `usuarios_registrar`(par_correo VARCHAR(45), par_contrasena VARCHAR(60))
BEGIN
INSERT INTO usuarios (correo, contrasena) VALUES (par_correo, par_contrasena);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `usuarios_restablecer_contrasena` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `usuarios_restablecer_contrasena`(par_id INT, par_contrasena VARCHAR(60))
BEGIN
	UPDATE usuarios SET contrasena = par_contrasena, contrasena_configurada = 0 WHERE id = par_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `usuarios_validar_credenciales` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `usuarios_validar_credenciales`(par_correo VARCHAR(45))
BEGIN
SELECT id, contrasena, administrador, contrasena_configurada FROM usuarios WHERE correo = par_correo;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `usuarios_verificar_administrador` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `usuarios_verificar_administrador`(par_id INT)
BEGIN
SELECT administrador FROM usuarios WHERE id = par_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-22 17:26:48
