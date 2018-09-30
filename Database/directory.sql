-- MySQL dump 10.13  Distrib 5.6.26, for Win64 (x86_64)
--
-- Host: localhost    Database: directory
-- ------------------------------------------------------
-- Server version	5.6.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


--
-- Database
--

DROP DATABASE IF EXISTS `directory`;
CREATE DATABASE `directory`;
USE `directory`;

--
-- Table structure for table `personadddetails`
--

DROP TABLE IF EXISTS `personadddetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `personadddetails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `person_id` int(11) NOT NULL,
  `dob` date NOT NULL DEFAULT '1900-01-01',
  `work_address` text NOT NULL,
  `notes` text NOT NULL,
  `home_address` text NOT NULL,
  `avatar` enum('yes','no') NOT NULL DEFAULT 'no',
  `avatar_filename` varchar(100) NOT NULL DEFAULT '',
  `home_contact` char(50) NOT NULL,
  `middle_name` char(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_personadddetails_persons` (`person_id`),
  CONSTRAINT `FK_personadddetails_persons` FOREIGN KEY (`person_id`) REFERENCES `persons` (`person_id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personadddetails`
--

LOCK TABLES `personadddetails` WRITE;
/*!40000 ALTER TABLE `personadddetails` DISABLE KEYS */;
INSERT INTO `personadddetails` VALUES (1,1,'1991-10-22','Manyata','','Babusapalya','no','','',''),(2,2,'1991-10-22','Manyata','','Behind Manayata','no','','',''),(3,3,'2015-09-02','sadjdshjg','hjgjgh','hjgjgjh','no','','','Jolie'),(4,4,'2015-09-02','sadjdshjg','hjgjgh','hjgjgjh','no','','','yuan'),(5,5,'1993-10-27','Delhi','','66/29, A, Kachiyana Mohal, Hoolanganj Road, Kanpur - 208001,\nUP - India','no','','',''),(6,6,'1983-05-17','Mumbai','Beautiful dancer','Delhi','no','','',''),(7,7,'0000-00-00','','','','no','','',''),(8,8,'0000-00-00','','','','no','','',''),(9,9,'0000-00-00','','','','no','','',''),(10,10,'0000-00-00','','','','no','','',''),(11,11,'0000-00-00','','','','no','','',''),(12,12,'0000-00-00','','','','no','','',''),(13,13,'0000-00-00','','','','no','','','The'),(14,14,'0000-00-00','','','','no','','','the'),(15,15,'1975-09-22','Earth','He is a great DJ.','Unknown','no','','44243424234','Van'),(16,16,'1962-08-12','','','','no','','',''),(17,17,'1994-06-13','Manyata','Loves to watch videos/football.','Bangalore','no','','98273984723','Kumar'),(18,18,'1953-02-11','','','','no','','987897',''),(19,19,'0000-00-00','','','','no','','112312',''),(20,20,'0000-00-00','','','','no','','',''),(21,21,'0000-00-00','','','','no','','',''),(22,22,'2015-09-08','dsf','dsf','dsf','no','','',''),(23,23,'0000-00-00','','','','no','','',''),(24,24,'0000-00-00','','','','no','','',''),(25,25,'1991-12-02','Manyata','Bleh','Marathalli','no','','23432423',''),(26,26,'0000-00-00','','','','no','','',''),(27,27,'0000-00-00','','','','no','','987897',''),(28,28,'1986-04-09','','Dancer','','no','','','');
/*!40000 ALTER TABLE `personadddetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `persons`
--

DROP TABLE IF EXISTS `persons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `persons` (
  `person_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` enum('Mr','Ms','Mrs') NOT NULL DEFAULT 'Mr',
  `first_name` char(50) NOT NULL,
  `last_name` char(50) NOT NULL,
  `email` char(50) NOT NULL,
  `work_contact` char(50) NOT NULL,
  `company` char(50) NOT NULL,
  PRIMARY KEY (`person_id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `persons`
--

LOCK TABLES `persons` WRITE;
/*!40000 ALTER TABLE `persons` DISABLE KEYS */;
INSERT INTO `persons` VALUES (1,'Mr','Akash','Gupta','akash.gpta@gmail.com','9900322005','cerner'),(2,'Mr','Arjun','RamaKrishnan','arjun.rama@cerner.com','4356435','Cerner'),(3,'Mr','Angelina','Pitt','angelina@dreamworks.com','3355','Dreamworks'),(4,'Mr','angela','jolie','angelina1@dreamworks.com','9900352005','Dreamworks'),(5,'Mr','Sagar','Gupta','sagar_best@gmail.com','39879837','Witworks'),(6,'Mr','Madhuri','Dixit','madhuri.hot@yahoo.com','9324858829','Bollywood'),(7,'Mr','Mary','Jane','mary.jane@yahoo.com','6784486496','dfgdg'),(8,'Mr','dsad','asd','sdadad@dsds.dsfds','9778646886','sfd'),(9,'Mr','Mark','D\'Souza','mark.d\'souza@gmail.com','9988097456','asdasd'),(10,'Mr','Peter','Smith','peter.smith@cerner.com','9967885347','asdas'),(11,'Mr','Mark','Anthony','mark.anthony@private.in','8690345864','asdad'),(12,'Mr','Brad','Pitt','brad@hollywood.gb','9834567987','sadas'),(13,'Mr','Jahapanah','Great','jptg@history.com','8373987233','dadsa'),(14,'Mr','Alexander','Warrior','alexander@thepast.in','8888999999','King'),(15,'Mr','Armin','Bu\'ren','armin.rocks@trance.com','9922678098','Freelancer'),(16,'Mr','Mika\'el','Akerfeldt','mikael.best@opeth.gl','6788777777','Opeth'),(17,'Mr','Dileep','Botcha','dileep2047@gmail.com','9324878372','IIT Chennai'),(18,'Mr','Mark','Henry','markhenry@wwe.com','987381','WWE'),(19,'Mr','Martin','Lopez','martin.lopez@opeth.com','32312','Opeth'),(20,'Mr','Hello','World','hell@something.com','8993279827','xzcsc'),(21,'Mr','C.H.','Sikandar','sikandar@cerner.com','9879878978','Cerner'),(22,'Mr','John','Denver','john.devern@gmail.com','435354353','kjds'),(23,'Mr','Maria','Cruz','maria.cruz@ship.in','9868799112','sada'),(24,'Mr','zczgc','hgfhgf','SAKDJH.DSHG21@DSAD.DS','8777668868','asdd'),(25,'Ms','Astha','Sharma','astha.sharma@cerner.com','345234213','Cerner'),(26,'Mr','Hemant','Pangan','h.pangan@witworks.in','234324324','adasd'),(27,'Mr','Mark','Henry','markheednry@wwe.com','9873812133','WWE'),(28,'Mr','Michael','Jackson','moonwalk@space.io','666','Music');
/*!40000 ALTER TABLE `persons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` char(50) NOT NULL,
  `password` char(50) NOT NULL,
  `priveleges` char(50) NOT NULL,
  `last_login` datetime NOT NULL,
  `name` char(50) DEFAULT 'User',
  `session_token` char(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'akash','akash','rw','2015-08-18 15:59:15','Akash','39d1f8885a14ba7b8ffaf57c01558495'),(2,'admin','password','rw','2015-08-18 15:59:37','Administrator','f5dfe057ea7d50fe829f65f106952229'),(3,'hello','world','r','2015-08-18 15:59:56','Vijay','0e53ca87caa8009f01da832c80d23fbd');
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

-- Dump completed on 2015-09-20 18:13:10
