
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `am` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `am`;
DROP TABLE IF EXISTS `agendamedicos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `agendamedicos` (
  `id_agendamedico` int(11) NOT NULL AUTO_INCREMENT,
  `especialidad` varchar(40) NOT NULL,
  `matricula` varchar(40) NOT NULL,
  `id_medico` int(11) NOT NULL,
  PRIMARY KEY (`id_agendamedico`),
  KEY `id_medico` (`id_medico`),
  CONSTRAINT `agendamedicos_ibfk_1` FOREIGN KEY (`id_medico`) REFERENCES `medicos` (`id_medico`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `alergias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `alergias` (
  `id_alergia` int(11) NOT NULL AUTO_INCREMENT,
  `id_entrada` int(11) NOT NULL,
  `fecha_desde` date NOT NULL,
  `fecha_hasta` date DEFAULT NULL,
  `id_nomenclada` int(11) NOT NULL,
  PRIMARY KEY (`id_alergia`),
  KEY `id_entrada` (`id_entrada`),
  KEY `id_nomenclada` (`id_nomenclada`),
  CONSTRAINT `alergias_ibfk_1` FOREIGN KEY (`id_entrada`) REFERENCES `atenciones` (`id_entrada`),
  CONSTRAINT `alergias_ibfk_2` FOREIGN KEY (`id_nomenclada`) REFERENCES `alergias_nomencladas` (`id_nomenclada`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `alergias_nomencladas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `alergias_nomencladas` (
  `id_nomenclada` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) NOT NULL,
  `importancia` varchar(20) NOT NULL,
  PRIMARY KEY (`id_nomenclada`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `antecedentes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `antecedentes` (
  `id_antecedentes` int(11) NOT NULL AUTO_INCREMENT,
  `id_entrada` int(11) NOT NULL,
  `descripcion` text NOT NULL,
  `fecha_desde` date NOT NULL,
  `fecha_hasta` date DEFAULT NULL,
  PRIMARY KEY (`id_antecedentes`),
  KEY `id_entrada` (`id_entrada`),
  CONSTRAINT `antecedentes_ibfk_1` FOREIGN KEY (`id_entrada`) REFERENCES `atenciones` (`id_entrada`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `atenciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `atenciones` (
  `id_entrada` int(11) NOT NULL AUTO_INCREMENT,
  `id_turno` int(11) NOT NULL,
  `activo` tinyint(1) NOT NULL,
  `fecha_inicio` datetime NOT NULL,
  `fecha_fin` datetime DEFAULT NULL,
  PRIMARY KEY (`id_entrada`),
  KEY `id_turno` (`id_turno`),
  CONSTRAINT `atenciones_ibfk_1` FOREIGN KEY (`id_turno`) REFERENCES `turnos` (`id_turno`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `calidad_diagnostico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `calidad_diagnostico` (
  `id_calidad` int(11) NOT NULL AUTO_INCREMENT,
  `calidad` varchar(20) NOT NULL,
  PRIMARY KEY (`id_calidad`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `diagnosticos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `diagnosticos` (
  `id_entrada` int(11) NOT NULL,
  `id_diagnostico` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` text NOT NULL,
  `id_calidad` int(11) NOT NULL,
  PRIMARY KEY (`id_diagnostico`),
  KEY `id_entrada` (`id_entrada`),
  KEY `id_calidad` (`id_calidad`),
  CONSTRAINT `diagnosticos_ibfk_1` FOREIGN KEY (`id_entrada`) REFERENCES `atenciones` (`id_entrada`),
  CONSTRAINT `diagnosticos_ibfk_2` FOREIGN KEY (`id_calidad`) REFERENCES `calidad_diagnostico` (`id_calidad`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `estados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `estados` (
  `id_estados` int(11) NOT NULL AUTO_INCREMENT,
  `estado` varchar(50) NOT NULL,
  PRIMARY KEY (`id_estados`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `evoluciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `evoluciones` (
  `id_evoluciones` int(11) NOT NULL AUTO_INCREMENT,
  `id_entrada` int(11) NOT NULL,
  `descripcion` text NOT NULL,
  PRIMARY KEY (`id_evoluciones`),
  KEY `id_entrada` (`id_entrada`),
  CONSTRAINT `evoluciones_ibfk_1` FOREIGN KEY (`id_entrada`) REFERENCES `atenciones` (`id_entrada`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `habitos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `habitos` (
  `id_habito` int(11) NOT NULL AUTO_INCREMENT,
  `id_entrada` int(11) NOT NULL,
  `descripcion` text NOT NULL,
  `fecha_desde` date NOT NULL,
  `fecha_hasta` date DEFAULT NULL,
  PRIMARY KEY (`id_habito`),
  KEY `id_entrada` (`id_entrada`),
  CONSTRAINT `habitos_ibfk_1` FOREIGN KEY (`id_entrada`) REFERENCES `atenciones` (`id_entrada`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `medicamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `medicamentos` (
  `id_medicamento` int(11) NOT NULL AUTO_INCREMENT,
  `id_entrada` int(11) NOT NULL,
  `descripcion` text DEFAULT NULL,
  PRIMARY KEY (`id_medicamento`),
  KEY `id_entrada` (`id_entrada`),
  CONSTRAINT `medicamentos_ibfk_1` FOREIGN KEY (`id_entrada`) REFERENCES `atenciones` (`id_entrada`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `medicos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `medicos` (
  `dni_medico` varchar(20) NOT NULL,
  `activo` tinyint(1) NOT NULL,
  `id_medico` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id_medico`),
  UNIQUE KEY `dni_medico` (`dni_medico`) USING BTREE,
  CONSTRAINT `medicos_ibfk_1` FOREIGN KEY (`dni_medico`) REFERENCES `personas` (`dni_persona`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `pacientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pacientes` (
  `dni_paciente` varchar(20) NOT NULL,
  `activo` tinyint(1) NOT NULL,
  `id_paciente` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id_paciente`),
  UNIQUE KEY `dni_paciente` (`dni_paciente`) USING BTREE,
  CONSTRAINT `pacientes_ibfk_1` FOREIGN KEY (`dni_paciente`) REFERENCES `personas` (`dni_persona`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `personas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `personas` (
  `dni_persona` varchar(20) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `apellido` varchar(20) NOT NULL,
  `email` varchar(20) NOT NULL,
  `direccion` varchar(20) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `fecha_nac` date NOT NULL,
  `genero` varchar(20) NOT NULL,
  PRIMARY KEY (`dni_persona`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `plantilla`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `plantilla` (
  `id_plantilla` int(11) NOT NULL AUTO_INCREMENT,
  `id_agendamedico` int(11) DEFAULT NULL,
  `titulo` varchar(100) NOT NULL,
  `contenido` text NOT NULL,
  PRIMARY KEY (`id_plantilla`),
  KEY `id_agendamedico` (`id_agendamedico`),
  CONSTRAINT `plantilla_ibfk_1` FOREIGN KEY (`id_agendamedico`) REFERENCES `agendamedicos` (`id_agendamedico`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `turnos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `turnos` (
  `id_turno` int(11) NOT NULL AUTO_INCREMENT,
  `id_agendamedico` int(20) NOT NULL,
  `id_paciente` int(11) NOT NULL,
  `fecha_turno` date NOT NULL,
  `horario` time NOT NULL,
  `motivo_consulta` varchar(255) NOT NULL,
  `id_estados` int(11) NOT NULL,
  PRIMARY KEY (`id_turno`),
  KEY `id_agendamedico` (`id_agendamedico`),
  KEY `id_estados` (`id_estados`),
  KEY `id_paciente` (`id_paciente`),
  CONSTRAINT `turnos_ibfk_3` FOREIGN KEY (`id_agendamedico`) REFERENCES `agendamedicos` (`id_agendamedico`),
  CONSTRAINT `turnos_ibfk_4` FOREIGN KEY (`id_estados`) REFERENCES `estados` (`id_estados`),
  CONSTRAINT `turnos_ibfk_5` FOREIGN KEY (`id_paciente`) REFERENCES `pacientes` (`id_paciente`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(255) NOT NULL,
  `usuario` varchar(40) NOT NULL,
  `activo` tinyint(1) NOT NULL,
  `id_agendamedico` int(11) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  KEY `id_medico` (`id_agendamedico`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`id_agendamedico`) REFERENCES `agendamedicos` (`id_agendamedico`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

