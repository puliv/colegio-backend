-- MySQL dump 10.13  Distrib 8.0.46, for Linux (x86_64)
--
-- Host: localhost    Database: libro_clases_db
-- ------------------------------------------------------
-- Server version	8.0.46-0ubuntu0.24.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `alumnos`
--

DROP TABLE IF EXISTS `alumnos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alumnos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rut` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `cursoId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `rut` (`rut`),
  UNIQUE KEY `rut_2` (`rut`),
  UNIQUE KEY `rut_3` (`rut`),
  UNIQUE KEY `rut_4` (`rut`),
  UNIQUE KEY `rut_5` (`rut`),
  UNIQUE KEY `rut_6` (`rut`),
  UNIQUE KEY `rut_7` (`rut`),
  UNIQUE KEY `rut_8` (`rut`),
  UNIQUE KEY `rut_9` (`rut`),
  UNIQUE KEY `rut_10` (`rut`),
  UNIQUE KEY `rut_11` (`rut`),
  UNIQUE KEY `rut_12` (`rut`),
  UNIQUE KEY `rut_13` (`rut`),
  UNIQUE KEY `rut_14` (`rut`),
  UNIQUE KEY `rut_15` (`rut`),
  UNIQUE KEY `rut_16` (`rut`),
  UNIQUE KEY `rut_17` (`rut`),
  UNIQUE KEY `rut_18` (`rut`),
  UNIQUE KEY `rut_19` (`rut`),
  UNIQUE KEY `rut_20` (`rut`),
  UNIQUE KEY `rut_21` (`rut`),
  UNIQUE KEY `rut_22` (`rut`),
  UNIQUE KEY `rut_23` (`rut`),
  UNIQUE KEY `rut_24` (`rut`),
  UNIQUE KEY `rut_25` (`rut`),
  UNIQUE KEY `rut_26` (`rut`),
  UNIQUE KEY `rut_27` (`rut`),
  UNIQUE KEY `rut_28` (`rut`),
  UNIQUE KEY `rut_29` (`rut`),
  UNIQUE KEY `rut_30` (`rut`),
  UNIQUE KEY `rut_31` (`rut`),
  UNIQUE KEY `rut_32` (`rut`),
  UNIQUE KEY `rut_33` (`rut`),
  UNIQUE KEY `rut_34` (`rut`),
  UNIQUE KEY `rut_35` (`rut`),
  UNIQUE KEY `rut_36` (`rut`),
  UNIQUE KEY `rut_37` (`rut`),
  UNIQUE KEY `rut_38` (`rut`),
  UNIQUE KEY `rut_39` (`rut`),
  UNIQUE KEY `rut_40` (`rut`),
  UNIQUE KEY `rut_41` (`rut`),
  UNIQUE KEY `rut_42` (`rut`),
  UNIQUE KEY `rut_43` (`rut`),
  UNIQUE KEY `rut_44` (`rut`),
  UNIQUE KEY `rut_45` (`rut`),
  UNIQUE KEY `rut_46` (`rut`),
  UNIQUE KEY `rut_47` (`rut`),
  UNIQUE KEY `rut_48` (`rut`),
  UNIQUE KEY `rut_49` (`rut`),
  UNIQUE KEY `rut_50` (`rut`),
  UNIQUE KEY `rut_51` (`rut`),
  UNIQUE KEY `rut_52` (`rut`),
  UNIQUE KEY `rut_53` (`rut`),
  UNIQUE KEY `rut_54` (`rut`),
  UNIQUE KEY `rut_55` (`rut`),
  UNIQUE KEY `rut_56` (`rut`),
  UNIQUE KEY `rut_57` (`rut`),
  UNIQUE KEY `rut_58` (`rut`),
  UNIQUE KEY `rut_59` (`rut`),
  UNIQUE KEY `rut_60` (`rut`),
  KEY `cursoId` (`cursoId`),
  CONSTRAINT `alumnos_ibfk_1` FOREIGN KEY (`cursoId`) REFERENCES `cursos` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumnos`
--

LOCK TABLES `alumnos` WRITE;
/*!40000 ALTER TABLE `alumnos` DISABLE KEYS */;
INSERT INTO `alumnos` VALUES (1,'21000024-K','Felipe','Araya',2,'2026-06-16 03:22:07','2026-06-16 03:22:07'),(2,'22111222-3','María','Soto',2,'2026-06-16 18:25:40','2026-06-16 18:25:40'),(3,'23444555-K','Pedro','Rojas',2,'2026-06-16 18:25:41','2026-06-16 18:25:41'),(4,'21999888-7','Lucas','Jara',2,'2026-06-16 18:25:41','2026-06-16 18:25:41'),(5,'22333444-5','Andrés','Silva',3,'2026-06-17 13:43:51','2026-06-17 13:43:51'),(6,'21444555-6','Camila','González',3,'2026-06-17 13:43:51','2026-06-17 13:43:51'),(7,'23555666-7','Diego','Muñoz',3,'2026-06-17 13:43:51','2026-06-17 13:43:51'),(8,'22666777-8','Valentina','Rojas',3,'2026-06-17 13:43:51','2026-06-17 13:43:51'),(9,'21777888-9','Martín','Contreras',3,'2026-06-17 13:43:51','2026-06-17 13:43:51'),(10,'23888999-K','Sofía','Sepúlveda',3,'2026-06-17 13:43:51','2026-06-17 13:43:51'),(11,'22999000-1','Tomás','Tapia',3,'2026-06-17 13:43:51','2026-06-17 13:43:51'),(12,'21111222-K','Javier','Morales',4,'2026-06-17 13:44:34','2026-06-17 13:44:34'),(13,'23222333-4','Florencia','Herrera',4,'2026-06-17 13:44:34','2026-06-17 13:44:34'),(14,'22333444-1','Benjamín','Fuentes',4,'2026-06-17 13:44:34','2026-06-17 13:44:34'),(15,'21444555-8','Isidora','Castro',4,'2026-06-17 13:44:34','2026-06-17 13:44:34'),(16,'23555666-5','Matías','Sanhueza',4,'2026-06-17 13:44:34','2026-06-17 13:44:34'),(17,'22666777-2','Antonia','Pizarro',4,'2026-06-17 13:44:34','2026-06-17 13:44:34'),(18,'21777888-0','Nicolás','Vargas',4,'2026-06-17 13:44:34','2026-06-17 13:44:34'),(19,'23888999-7','Catalina','Mendoza',4,'2026-06-17 13:44:34','2026-06-17 13:44:34'),(20,'22999000-K','Joaquín','Garrido',4,'2026-06-17 13:44:34','2026-06-17 13:44:34'),(21,'21000111-3','Fernanda','Cárcamo',4,'2026-06-17 13:44:34','2026-06-17 13:44:34'),(22,'21222333-6','Gonzalo','Aravena',5,'2026-06-17 13:45:01','2026-06-17 13:45:01'),(23,'23333444-2','Isabel','Gutiérrez',5,'2026-06-17 13:45:01','2026-06-17 13:45:01'),(24,'22444555-K','Lucas','Maldonado',5,'2026-06-17 13:45:01','2026-06-17 13:45:01'),(25,'21555666-7','Constanza','Cáceres',5,'2026-06-17 13:45:01','2026-06-17 13:45:01'),(26,'23666777-4','Gabriel','Bustos',5,'2026-06-17 13:45:01','2026-06-17 13:45:01'),(27,'22777888-1','Ignacia','Venegas',5,'2026-06-17 13:45:01','2026-06-17 13:45:01'),(28,'21888999-9','Felipe','Henríquez',5,'2026-06-17 13:45:01','2026-06-17 13:45:01'),(29,'23999000-5','Francisca','Farías',5,'2026-06-17 13:45:01','2026-06-17 13:45:01');
/*!40000 ALTER TABLE `alumnos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `anotaciones`
--

DROP TABLE IF EXISTS `anotaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `anotaciones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `alumnoId` int NOT NULL,
  `tipo` enum('Positiva','Negativa') NOT NULL,
  `descripcion` text NOT NULL,
  `fecha` date NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `alumnoId` (`alumnoId`),
  CONSTRAINT `anotaciones_ibfk_1` FOREIGN KEY (`alumnoId`) REFERENCES `alumnos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anotaciones`
--

LOCK TABLES `anotaciones` WRITE;
/*!40000 ALTER TABLE `anotaciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `anotaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asistencias`
--

DROP TABLE IF EXISTS `asistencias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asistencias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  `estado` enum('PRESENTE','AUSENTE','JUSTIFICADO') NOT NULL DEFAULT 'PRESENTE',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `alumnoId` int DEFAULT NULL,
  `justificacion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `alumnoId` (`alumnoId`),
  CONSTRAINT `asistencias_ibfk_1` FOREIGN KEY (`alumnoId`) REFERENCES `alumnos` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asistencias`
--

LOCK TABLES `asistencias` WRITE;
/*!40000 ALTER TABLE `asistencias` DISABLE KEYS */;
/*!40000 ALTER TABLE `asistencias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `calificaciones`
--

DROP TABLE IF EXISTS `calificaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `calificaciones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nota` decimal(2,1) NOT NULL,
  `fecha` date NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `alumnoId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `alumnoId` (`alumnoId`),
  CONSTRAINT `calificaciones_ibfk_1` FOREIGN KEY (`alumnoId`) REFERENCES `alumnos` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calificaciones`
--

LOCK TABLES `calificaciones` WRITE;
/*!40000 ALTER TABLE `calificaciones` DISABLE KEYS */;
INSERT INTO `calificaciones` VALUES (9,5.0,'2026-06-17','Evaluacion 1','2026-06-17 17:36:57','2026-06-17 17:36:57',1),(10,5.5,'2026-06-17','Evaluacion 1','2026-06-17 17:36:57','2026-06-17 17:36:57',2),(11,4.5,'2026-06-17','Evaluacion 1','2026-06-17 17:36:57','2026-06-17 17:36:57',3),(12,7.0,'2026-06-17','Evaluacion 1','2026-06-17 17:36:57','2026-06-17 17:36:57',4),(13,2.0,'2026-06-17','Evaluacion 2','2026-06-17 17:37:41','2026-06-17 17:37:41',1),(14,3.0,'2026-06-17','Evaluacion 2','2026-06-17 17:37:41','2026-06-17 17:37:41',2),(15,2.0,'2026-06-17','Evaluacion 2','2026-06-17 17:37:41','2026-06-17 17:37:41',3),(16,2.5,'2026-06-17','Evaluacion 2','2026-06-17 17:37:41','2026-06-17 17:37:41',4),(17,4.3,'2026-06-17','Evaluacion 1','2026-06-17 18:04:22','2026-06-17 18:04:22',5),(18,6.0,'2026-06-17','Evaluacion 1','2026-06-17 18:04:22','2026-06-17 18:04:22',6),(19,6.0,'2026-06-17','Evaluacion 1','2026-06-17 18:04:22','2026-06-17 18:04:22',7),(20,6.6,'2026-06-17','Evaluacion 1','2026-06-17 18:04:22','2026-06-17 18:04:22',8),(21,7.0,'2026-06-17','Evaluacion 1','2026-06-17 18:04:22','2026-06-17 18:04:22',9),(22,6.5,'2026-06-17','Evaluacion 1','2026-06-17 18:04:22','2026-06-17 18:04:22',10),(23,3.0,'2026-06-17','Evaluacion 1','2026-06-17 18:04:22','2026-06-17 18:04:22',11);
/*!40000 ALTER TABLE `calificaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cursos`
--

DROP TABLE IF EXISTS `cursos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cursos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `profesorId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`),
  UNIQUE KEY `nombre_2` (`nombre`),
  UNIQUE KEY `nombre_3` (`nombre`),
  UNIQUE KEY `nombre_4` (`nombre`),
  UNIQUE KEY `nombre_5` (`nombre`),
  UNIQUE KEY `nombre_6` (`nombre`),
  UNIQUE KEY `nombre_7` (`nombre`),
  UNIQUE KEY `nombre_8` (`nombre`),
  UNIQUE KEY `nombre_9` (`nombre`),
  UNIQUE KEY `nombre_10` (`nombre`),
  UNIQUE KEY `nombre_11` (`nombre`),
  UNIQUE KEY `nombre_12` (`nombre`),
  UNIQUE KEY `nombre_13` (`nombre`),
  UNIQUE KEY `nombre_14` (`nombre`),
  UNIQUE KEY `nombre_15` (`nombre`),
  UNIQUE KEY `nombre_16` (`nombre`),
  UNIQUE KEY `nombre_17` (`nombre`),
  UNIQUE KEY `nombre_18` (`nombre`),
  UNIQUE KEY `nombre_19` (`nombre`),
  UNIQUE KEY `nombre_20` (`nombre`),
  UNIQUE KEY `nombre_21` (`nombre`),
  UNIQUE KEY `nombre_22` (`nombre`),
  UNIQUE KEY `nombre_23` (`nombre`),
  UNIQUE KEY `nombre_24` (`nombre`),
  UNIQUE KEY `nombre_25` (`nombre`),
  UNIQUE KEY `nombre_26` (`nombre`),
  UNIQUE KEY `nombre_27` (`nombre`),
  UNIQUE KEY `nombre_28` (`nombre`),
  UNIQUE KEY `nombre_29` (`nombre`),
  UNIQUE KEY `nombre_30` (`nombre`),
  UNIQUE KEY `nombre_31` (`nombre`),
  UNIQUE KEY `nombre_32` (`nombre`),
  UNIQUE KEY `nombre_33` (`nombre`),
  UNIQUE KEY `nombre_34` (`nombre`),
  UNIQUE KEY `nombre_35` (`nombre`),
  UNIQUE KEY `nombre_36` (`nombre`),
  UNIQUE KEY `nombre_37` (`nombre`),
  UNIQUE KEY `nombre_38` (`nombre`),
  UNIQUE KEY `nombre_39` (`nombre`),
  UNIQUE KEY `nombre_40` (`nombre`),
  UNIQUE KEY `nombre_41` (`nombre`),
  UNIQUE KEY `nombre_42` (`nombre`),
  UNIQUE KEY `nombre_43` (`nombre`),
  UNIQUE KEY `nombre_44` (`nombre`),
  UNIQUE KEY `nombre_45` (`nombre`),
  UNIQUE KEY `nombre_46` (`nombre`),
  UNIQUE KEY `nombre_47` (`nombre`),
  UNIQUE KEY `nombre_48` (`nombre`),
  UNIQUE KEY `nombre_49` (`nombre`),
  UNIQUE KEY `nombre_50` (`nombre`),
  UNIQUE KEY `nombre_51` (`nombre`),
  UNIQUE KEY `nombre_52` (`nombre`),
  UNIQUE KEY `nombre_53` (`nombre`),
  UNIQUE KEY `nombre_54` (`nombre`),
  UNIQUE KEY `nombre_55` (`nombre`),
  UNIQUE KEY `nombre_56` (`nombre`),
  UNIQUE KEY `nombre_57` (`nombre`),
  UNIQUE KEY `nombre_58` (`nombre`),
  UNIQUE KEY `nombre_59` (`nombre`),
  UNIQUE KEY `nombre_60` (`nombre`),
  UNIQUE KEY `nombre_61` (`nombre`),
  UNIQUE KEY `nombre_62` (`nombre`),
  KEY `profesorId` (`profesorId`),
  CONSTRAINT `cursos_ibfk_1` FOREIGN KEY (`profesorId`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cursos`
--

LOCK TABLES `cursos` WRITE;
/*!40000 ALTER TABLE `cursos` DISABLE KEYS */;
INSERT INTO `cursos` VALUES (2,'4° A',1,'2026-06-16 18:11:27','2026-06-16 18:11:27'),(3,'6° B',1,'2026-06-17 13:41:35','2026-06-17 13:41:35'),(4,'7° A',1,'2026-06-17 13:42:15','2026-06-17 13:42:15'),(5,'7° B',1,'2026-06-17 13:42:39','2026-06-17 13:42:39');
/*!40000 ALTER TABLE `cursos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol` varchar(255) DEFAULT 'PROFESOR',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_4` (`email`),
  UNIQUE KEY `email_5` (`email`),
  UNIQUE KEY `email_6` (`email`),
  UNIQUE KEY `email_7` (`email`),
  UNIQUE KEY `email_8` (`email`),
  UNIQUE KEY `email_9` (`email`),
  UNIQUE KEY `email_10` (`email`),
  UNIQUE KEY `email_11` (`email`),
  UNIQUE KEY `email_12` (`email`),
  UNIQUE KEY `email_13` (`email`),
  UNIQUE KEY `email_14` (`email`),
  UNIQUE KEY `email_15` (`email`),
  UNIQUE KEY `email_16` (`email`),
  UNIQUE KEY `email_17` (`email`),
  UNIQUE KEY `email_18` (`email`),
  UNIQUE KEY `email_19` (`email`),
  UNIQUE KEY `email_20` (`email`),
  UNIQUE KEY `email_21` (`email`),
  UNIQUE KEY `email_22` (`email`),
  UNIQUE KEY `email_23` (`email`),
  UNIQUE KEY `email_24` (`email`),
  UNIQUE KEY `email_25` (`email`),
  UNIQUE KEY `email_26` (`email`),
  UNIQUE KEY `email_27` (`email`),
  UNIQUE KEY `email_28` (`email`),
  UNIQUE KEY `email_29` (`email`),
  UNIQUE KEY `email_30` (`email`),
  UNIQUE KEY `email_31` (`email`),
  UNIQUE KEY `email_32` (`email`),
  UNIQUE KEY `email_33` (`email`),
  UNIQUE KEY `email_34` (`email`),
  UNIQUE KEY `email_35` (`email`),
  UNIQUE KEY `email_36` (`email`),
  UNIQUE KEY `email_37` (`email`),
  UNIQUE KEY `email_38` (`email`),
  UNIQUE KEY `email_39` (`email`),
  UNIQUE KEY `email_40` (`email`),
  UNIQUE KEY `email_41` (`email`),
  UNIQUE KEY `email_42` (`email`),
  UNIQUE KEY `email_43` (`email`),
  UNIQUE KEY `email_44` (`email`),
  UNIQUE KEY `email_45` (`email`),
  UNIQUE KEY `email_46` (`email`),
  UNIQUE KEY `email_47` (`email`),
  UNIQUE KEY `email_48` (`email`),
  UNIQUE KEY `email_49` (`email`),
  UNIQUE KEY `email_50` (`email`),
  UNIQUE KEY `email_51` (`email`),
  UNIQUE KEY `email_52` (`email`),
  UNIQUE KEY `email_53` (`email`),
  UNIQUE KEY `email_54` (`email`),
  UNIQUE KEY `email_55` (`email`),
  UNIQUE KEY `email_56` (`email`),
  UNIQUE KEY `email_57` (`email`),
  UNIQUE KEY `email_58` (`email`),
  UNIQUE KEY `email_59` (`email`),
  UNIQUE KEY `email_60` (`email`),
  UNIQUE KEY `email_61` (`email`),
  UNIQUE KEY `email_62` (`email`),
  UNIQUE KEY `email_63` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Benjamín Perez','benjamin@cbo.cl','$2b$10$Pmd1oJb2mkLRtvBDBlRukusmqcajKkurgja.d4jntq9IzjDE3keaS','PROFESOR','2026-06-16 03:15:15','2026-06-16 03:15:15');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-03 23:30:19
