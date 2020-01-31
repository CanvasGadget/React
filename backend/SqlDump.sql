-- MySQL dump 10.13  Distrib 8.0.16, for macos10.14 (x86_64)
--
-- Host: 127.0.0.1    Database: nodemysql
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `color` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (8,'Music Therapy','#109bf2'),(9,'Group Session','#b8e986'),(10,'Lessons','#ff39cf');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `clients` (
  `id` int(11) NOT NULL,
  `active` tinyint(5) DEFAULT NULL,
  `title` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `client_full_name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `client_first_name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `client_last_name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `client_initials` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `client_type` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `city` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `zip` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `street_address` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `assi_therapist_full_name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `facility` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `session_type` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `session_cost` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `session_length` double DEFAULT NULL,
  `bday` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `notes` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `state` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `contact_title` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `contact_first_name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `contact_last_name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `contact_street_address` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `contact_city` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `contact_state` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `contact_zip` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `contact_email` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `contact_rec_email` tinyint(5) DEFAULT NULL,
  `contact_phone` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `contact_sec_phone` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `bill_same_as_contact` tinyint(5) DEFAULT NULL,
  `billing_first_name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `billing_last_name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `billing_full_name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `payment_type` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `card_type` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `card_num` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `card_exp_date` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `cvv` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `billing_street_address` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `name_on_card` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `billing_city` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `billing_state` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `billing_email` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `billing_phone` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `billing_zip` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `contact2_active` tinyint(5) DEFAULT NULL,
  `contact2_title` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `contact2_first_name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `contact2_last_name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `contact2_street_address` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `contact2_city` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `contact2_state` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `contact2_zip` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `contact2_email` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `contact2_rec_email` tinyint(5) DEFAULT NULL,
  `contact2_phone` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `contact2_sec_phone` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `contact3_active` tinyint(5) DEFAULT NULL,
  `contact3_title` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `contact3_first_name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `contact3_last_name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `contact3_street_address` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `contact3_city` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `contact3_state` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `contact3_zip` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `contact3_email` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `contact3_phone` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `contact3_sec_phone` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `addgoal1` tinyint(5) DEFAULT NULL,
  `goal1_active` tinyint(5) DEFAULT NULL,
  `goal1_desc` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `obj1_1_desc` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `obj1_2_desc` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `obj1_3_desc` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `addgoal2` tinyint(5) DEFAULT NULL,
  `goal2_active` tinyint(5) DEFAULT NULL,
  `goal2_desc` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `obj2_1_desc` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `obj2_2_desc` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `obj2_3_desc` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `addgoal3` tinyint(5) DEFAULT NULL,
  `goal3_active` tinyint(5) DEFAULT NULL,
  `goal3_desc` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `obj3_1_desc` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `obj3_2_desc` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `obj3_3_desc` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `addgoal4` tinyint(5) DEFAULT NULL,
  `goal4_active` tinyint(5) DEFAULT NULL,
  `goal4_desc` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `obj4_1_desc` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `obj4_2_desc` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `obj4_3_desc` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `addgoal5` tinyint(5) DEFAULT NULL,
  `goal5_active` tinyint(5) DEFAULT NULL,
  `goal5_desc` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `obj5_1_desc` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `obj5_2_desc` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `obj5_3_desc` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `addgoal6` tinyint(5) DEFAULT NULL,
  `goal6_active` tinyint(5) DEFAULT NULL,
  `goal6_desc` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `obj6_1_desc` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `obj6_2_desc` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `obj6_3_desc` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `addgoal7` tinyint(5) DEFAULT NULL,
  `goal7_active` tinyint(5) DEFAULT NULL,
  `goal7_desc` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `obj7_1_desc` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `obj7_2_desc` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `obj7_3_desc` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `addgoal8` tinyint(5) DEFAULT NULL,
  `goal8_active` tinyint(5) DEFAULT NULL,
  `goal8_desc` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `obj8_1_desc` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `obj8_2_desc` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `obj8_3_desc` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `addgoal9` tinyint(5) DEFAULT NULL,
  `goal9_active` tinyint(5) DEFAULT NULL,
  `goal9_desc` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `obj9_1_desc` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `obj9_2_desc` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `obj9_3_desc` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `addgoal10` tinyint(5) DEFAULT NULL,
  `goal10_active` tinyint(5) DEFAULT NULL,
  `goal10_desc` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `obj10_1_desc` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `obj10_2_desc` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `obj10_3_desc` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (1,1,'Mr.','Billy Joe','Billy','Joe','BJ','Individual','123-444-5555','Plano','75023','123 Fake Street','bjoe@mail.com','Harry Potter',NULL,'Therapy','40',60,'7/3/03','He is shy at first but will eventually open up0','TX','Mr.','Bob','Joe','123 Apple Street','Plano','TX','75023','bobjoe@mail.com',0,'123-222-2222',NULL,0,'Bob','Joe','Bob Joe','Card','Visa','11111111111','10/25','123','123 Fake Street','Bob Joe','Plano','TX','bjoe@mail.com','123-123-123','75023',1,'Mrs.','Rachel','Joe','123 Orange Street','Plano','TX','75023','rjoe@mail.com',NULL,'555-444-3333',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1,NULL,NULL,NULL,NULL,0,0,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL),(2,1,'Miss','Sarah Silver','Sarah','Silver','SS','Facility','123-222-3333','Allen','75002','444 Clark Drive','ssilver@mail.com','Lisa Simpson','Clark High School','Therapy','20',60,'6/3/00',NULL,'TX','Ms.','Sarah','Silver','432 Rose Road','Allen','TX','75002','ssilver@mail.com',NULL,'555-555-5555',NULL,NULL,'Sarah','Silver','Sarah Silver','Check',NULL,NULL,NULL,NULL,'432 Rose Road',NULL,'Allen','TX','ssilver@mail.com','111-111-1111','34342',NULL,'Mr.','Sam','Silver','432 Rose Road','Allen','TX','75002','samsilver@mail.com',NULL,'444-555-4444',NULL,NULL,'Mx.','Alex','Silver','200 Golden Avenue','Highland Park','TX','75209','asilver@mail.com','300-222-2222',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3,1,'Mr.','Jaren Jones','Jaren','Jones','JJ','Individual','123-111-2232','Dallas','75019','234 Tree Street','jjones@mail.com','Harry Potter',NULL,'Therapy','20',60,'5/7/05',NULL,'TX','Mrs.','Peter','Jones','1111 Ivy Lane','Dallas','TX','75019','nname@mail.com',NULL,'777-777-7777','888-888-8888',NULL,'Ned','Jones','Ned Jones','Card','Discover','3333333333','2/23','432','1111 Lane','Ned E. Jones','Dallas','TX','ned@mail.com','222-222-2222','22424',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(4,1,'Mr.','Ian Stark','Ian','Stark','IS','Individual','122-232-4444','Dallas','75032','645 Elm Ave','istark@mail.com','Jake Jakerson',NULL,'Therapy','20',60,'8/2/01',NULL,'TX','Mr.','Bill','Jakerson','3214 Elm Court','Smithtown','TX','75032','ffake@mail.com',NULL,'234-334-3444','121-112-2222',NULL,'Fred','Jakerson','Fred Jakerson','Check',NULL,NULL,NULL,NULL,'2343 Ave',NULL,'Plano','TX','money@mail.com','444-444-4444','12345',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5,1,'Mr.','Johnny Jackson','Johnny','Jackson','JJ','Facility','122-222-1111','Frisco','75068','789 Tom Lane','johnjack@mail.com','Hermione Grainger','Thomas Elementary','Lessons','20',60,'9/6/12',NULL,'TX','Mrs.','Tony','Stark','4352 Imagine Lane','Austin','TX','75068','jjackson@mail.com',NULL,'111-111-1111',NULL,NULL,'Jill','Jackson','Jill Jackson','Cash',NULL,NULL,NULL,NULL,'5555 Lane',NULL,'Frisco','TX','jilljackson@mail.com','555-555-5544','54321',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(70,1,'Mr.','Joe Jackson','Joe','Jackson','JJ','Facility','122-222-1111','Frisco','75068','789 Tom Lane','joejack@mail.com','Hermione Grainger','Thomas Elementary','Lessons','20',60,'10/4/13',NULL,'TX','Mrs.','Jill','Jackson','4352 Imagine Lane','Austin','TX','75068','jjackson@mail.com',NULL,'111-111-1111',NULL,NULL,'Jill','Jackson','Jill Jackson','Cash',NULL,NULL,NULL,NULL,'5555 Lanr',NULL,'Frisco','TX','jilljackson@mail.com','555-555-5544','54321',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(71,1,'Miss','Joan Jackson','Joan','Jackson','JJ','Facility','122-222-1111','Frisco','75068','789 Tom Lane','joanjack@mail.com','Hermione Grainger','Thomas Elementary','Lessons','20',60,'1/4/15',NULL,'TX','Mrs.','Jill','Jackson','4352 Imagine Lane','Austin','TX','75068','jjackson@mail.com',NULL,'111-111-1111',NULL,NULL,'Jill','Jackson','Jill Jackson','Cash',NULL,NULL,NULL,NULL,NULL,NULL,'Frisco',NULL,'jilljackson@mail.com','555-555-5544',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoices`
--

DROP TABLE IF EXISTS `invoices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `invoices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` varchar(45) DEFAULT NULL,
  `inv_date` date DEFAULT NULL,
  `payor` varchar(45) DEFAULT NULL,
  `payor_first` varchar(45) DEFAULT NULL,
  `payor_last` varchar(45) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `amount` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoices`
--

LOCK TABLES `invoices` WRITE;
/*!40000 ALTER TABLE `invoices` DISABLE KEYS */;
INSERT INTO `invoices` VALUES (1,'Paid','2019-09-10','JIll Jackson','Mary','Smith','2019-08-10','2019-09-09','120'),(2,'Paid','2019-10-10','Bob Joe','Jim','Adams','2019-09-10','2019-10-10','80'),(3,'Paid','2019-10-11','Sarah Silver',NULL,NULL,'2019-10-11','2019-10-11','40'),(4,'Paid','2019-10-11','Ned Jones',NULL,NULL,'2019-10-01','2019-10-31','100'),(5,NULL,'2019-10-11','Jiil Jackson',NULL,NULL,'2019-10-11','2019-10-11','200'),(7,NULL,'2019-10-11','Fred Jakerson',NULL,NULL,'2019-10-11','2019-10-11','100'),(8,NULL,'2019-10-22','Sarah Silver',NULL,NULL,'2019-09-22','2019-10-22','40'),(9,NULL,'2019-11-19','Sarah Silver',NULL,NULL,'2019-10-19','2019-11-19','40'),(10,NULL,'2019-11-19','Bob Joe',NULL,NULL,'2019-10-01','2019-11-09','80'),(11,NULL,'2019-11-19','Fred Jakerson',NULL,NULL,'2019-10-01','2019-11-09','100');
/*!40000 ALTER TABLE `invoices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `members`
--

DROP TABLE IF EXISTS `members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `members` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `active` tinyint(5) DEFAULT NULL,
  `title` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `member_full_name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `member_first_name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `member_last_name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `member_initials` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `street_address` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `city` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `state` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `zip` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `location` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `clients` text COLLATE utf8mb4_general_ci,
  `bday` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `npi` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `notes` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `role` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `inv_billing` tinyint(5) DEFAULT NULL,
  `cal_every` tinyint(5) DEFAULT NULL,
  `view_other_clients` tinyint(5) DEFAULT NULL,
  `edit_other_sched` tinyint(5) DEFAULT NULL,
  `view_other_sched` tinyint(5) DEFAULT NULL,
  `edit_other_info` tinyint(5) DEFAULT NULL,
  `view_other_info` tinyint(5) DEFAULT NULL,
  `add_client` tinyint(5) DEFAULT NULL,
  `record_attendance` tinyint(5) DEFAULT NULL,
  `take_pay` tinyint(5) DEFAULT NULL,
  `view_note_hist` tinyint(5) DEFAULT NULL,
  `view_create_rep` tinyint(5) DEFAULT NULL,
  `view_own_cal` tinyint(5) DEFAULT NULL,
  `view_own_clients` tinyint(5) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `members`
--

LOCK TABLES `members` WRITE;
/*!40000 ALTER TABLE `members` DISABLE KEYS */;
INSERT INTO `members` VALUES (1,1,'Dr.','Harry Potter','Harry','Potter','HP','hpotter@mail.com','123-456-1111','713 Hogwarts Lane','London','TX','77777','Diagon Alley','Sarah Silver,Jaren Jones','01/1/1999','6764876543','','Administrator',1,1,1,1,1,1,1,1,1,1,1,1,1,1),(2,1,'Ms.','Hermione Grainger','Hermione','Grainger','HG','email@mail.com','123-333-3333','123 Fake Street','Plano',NULL,'75023','Wherever','Billy Joe,Ian Stark','02/1/2002','1242658633',NULL,'Intern',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3,1,'Mr.','Joe Bob','Joe','Bob','JB','jbob@mail.com','222-223-3333','123 Street Lane','Frisco',NULL,'12345','Nowhere',NULL,'03/1/1999','4356787654',NULL,'Therapist',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(4,1,'Mr.','John Robinson','John','Robinson','JR','jrob@mail.com','122-222-2222','222 Nowhere','Allen',NULL,'12333','Somewhere',NULL,'04/1/2005','1232456754',NULL,'Administrator',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5,1,'Dr','Lisa Simpson','Lisa','Simpson','LS','lsimpson@mail.com','111-222-2222','222 Evergreen Terrace','Springfield',NULL,'22244','Everywhere',NULL,'05/1/2001','8675674321',NULL,'Therapist',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(38,1,'Mr.','Jake Jakerson','Jake','Jakerson','JJ','jake@mail.com','233-333-3333','123 Jake Street','Jaketopia',NULL,'33333','Main Building',NULL,'05/12/1999','6587776655','Jake has notes','Intern',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `templates`
--

DROP TABLE IF EXISTS `templates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `templates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `template_name` varchar(45) DEFAULT NULL,
  `visible` varchar(3) DEFAULT NULL,
  `created` timestamp(6) NULL DEFAULT NULL,
  `sections` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `templates`
--

LOCK TABLES `templates` WRITE;
/*!40000 ALTER TABLE `templates` DISABLE KEYS */;
INSERT INTO `templates` VALUES (1,'SOAP ','Yes','2019-07-08 00:00:21.176000',NULL),(2,'Narrative','Yes','2019-07-08 00:00:21.176000',NULL),(3,'Rating Scale','Yes','2019-07-08 00:00:21.176000',NULL),(4,'Percentage Scale','Yes','2019-07-08 00:00:21.176000',NULL),(6,'Template 1','Yes','2020-01-08 01:00:21.176000','[{\"id\":\"4dd6275f93788696ea3d\",\"fields\":[{\"title\":\"Textbox 1\",\"checkboxes\":[],\"notes\":\"Here are the notes\"}],\"type\":\"Textbox\"},{\"id\":\"ead8a70eeae3d6ade462\",\"fields\":[{\"rating\":10,\"title\":\"How are they doing?\"}],\"type\":\"Rating Scale\"},{\"id\":\"b7290dc0be573c6f6b8b\",\"fields\":[{\"title\":\"Perc Scale 2\",\"value\":\"\"}],\"type\":\"Percentage Scale\"}]');
/*!40000 ALTER TABLE `templates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testevent`
--

DROP TABLE IF EXISTS `testevent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `testevent` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `bill_type` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `client` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `therapist` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `start` datetime DEFAULT NULL,
  `end` datetime DEFAULT NULL,
  `location` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `category` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `notes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `note_date` date DEFAULT NULL,
  `attendance` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `repeats` tinyint(5) DEFAULT NULL,
  `repeat_option` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `end_repeat` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `num_occurences` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `end_date_occurrence` date DEFAULT NULL,
  `custom_frequency` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `repeat_num_days` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `sun` tinyint(5) DEFAULT NULL,
  `mon` tinyint(5) DEFAULT NULL,
  `tues` tinyint(5) DEFAULT NULL,
  `wed` tinyint(5) DEFAULT NULL,
  `thu` tinyint(5) DEFAULT NULL,
  `fri` tinyint(5) DEFAULT NULL,
  `sat` tinyint(5) DEFAULT NULL,
  `series_start_id` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `billing_email` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `session_cost` double DEFAULT NULL,
  `session_set_length` double DEFAULT NULL,
  `event_date` datetime DEFAULT NULL,
  `payor` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `transType` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `method` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `trans_date` date DEFAULT NULL,
  `description` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `type` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `clients` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `therapists` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=10036 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testevent`
--

LOCK TABLES `testevent` WRITE;
/*!40000 ALTER TABLE `testevent` DISABLE KEYS */;
INSERT INTO `testevent` VALUES (10,'','Billable','','','2019-10-20 09:00:00','2019-10-20 10:00:00','','',NULL,NULL,NULL,1,'Weekly','On Date','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'888','bjoe@mail.com',20,60,'2019-10-20 09:00:00',NULL,'Calendar',0,NULL,'2019-10-20','Session with Harry Potter',NULL,'Billy Joe','Harry Potter'),(888,'','Billable','','','2019-11-01 09:00:00','2019-11-01 10:00:00','','',NULL,NULL,'Present ($)',1,'Weekly','On Date','','2019-11-29','','',0,0,0,0,0,0,0,'888','bjoe@mail.com',20,60,'2019-11-01 09:00:00',NULL,'Calendar',0,NULL,'2019-11-01','Session with Harry Potter',NULL,'Billy Joe','Harry Potter'),(889,'','Billable','','','2019-11-08 09:00:00','2019-11-08 10:00:00','','',NULL,NULL,'Present ($)',1,'Weekly','On Date','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'888','bjoe@mail.com',20,60,'2019-11-08 09:00:00',NULL,'Calendar',0,NULL,'2019-11-08','Session with Harry Potter',NULL,'Billy Joe','Harry Potter'),(890,'','Billable','','','2019-11-15 09:00:00','2019-11-15 10:00:00','','',NULL,NULL,'Absent, no notice ($)',1,'Weekly','On Date','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'888','bjoe@mail.com',20,60,'2019-11-15 09:00:00',NULL,'Calendar',0,NULL,'2019-11-15','Session with Harry Potter',NULL,'Billy Joe','Harry Potter'),(891,'','Billable','','','2019-11-22 09:00:00','2019-11-22 10:00:00','','',NULL,NULL,NULL,1,'Weekly','On Date','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'888','bjoe@mail.com',20,60,'2019-11-22 09:00:00',NULL,'Calendar',0,NULL,'2019-11-22','Session with Harry Potter',NULL,'Billy Joe','Harry Potter'),(892,'','Billable','','','2019-11-29 09:00:00','2019-11-29 10:00:00','','',NULL,NULL,NULL,1,'Weekly','On Date','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'888','bjoe@mail.com',20,60,'2019-11-29 09:00:00',NULL,'Calendar',0,NULL,'2019-11-29','Session with Harry Potter',NULL,'Billy Joe','Harry Potter'),(893,'','','','','2019-11-10 08:30:00','2019-11-10 09:00:00','','',NULL,NULL,'Present ($)',0,'false','','','2019-11-21','','',0,0,0,0,0,0,0,'893','',0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Jaren Jones,Ian Stark','Harry Potter'),(894,'','Billable','','','2019-11-04 09:00:00','2019-11-04 10:00:00','','#109bf2',NULL,NULL,'Present ($)',1,'Weekly','On Date','','2019-12-02','','',0,0,0,0,0,0,0,'894','ssilver@mail.com',20,60,'2019-11-04 00:00:00',NULL,'Calendar',0,NULL,NULL,'Session with Hermione Grainger',NULL,'Sarah Silver','Hermione Grainger'),(895,'','Billable','','','2019-11-11 09:00:00','2019-11-11 10:00:00','','#109bf2',NULL,NULL,'Present ($)',1,'Weekly','On Date','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'894','ssilver@mail.com',20,60,'2019-11-04 00:00:00',NULL,'Calendar',0,NULL,NULL,'Session with Hermione Grainger',NULL,'Sarah Silver','Hermione Grainger'),(896,'','Billable','','','2019-11-18 09:00:00','2019-11-18 10:00:00','','#109bf2',NULL,NULL,NULL,1,'Weekly','On Date','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'894','ssilver@mail.com',20,60,'2019-11-04 00:00:00',NULL,'Calendar',0,NULL,NULL,'Session with Hermione Grainger',NULL,'Sarah Silver','Hermione Grainger'),(897,'','Billable','','','2019-11-25 09:00:00','2019-11-25 10:00:00','','#109bf2',NULL,NULL,NULL,1,'Weekly','On Date','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'894','ssilver@mail.com',20,60,'2019-11-04 00:00:00',NULL,'Calendar',0,NULL,NULL,'Session with Hermione Grainger',NULL,'Sarah Silver','Hermione Grainger'),(898,'','Billable','','','2019-12-02 09:00:00','2019-12-02 10:00:00','','#109bf2',NULL,NULL,'Absent, no notice ($)',1,'Weekly','On Date','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'894','ssilver@mail.com',20,60,'2019-11-04 00:00:00',NULL,'Calendar',0,NULL,NULL,'Session with Hermione Grainger',NULL,'Sarah Silver','Hermione Grainger'),(899,'','Billable','','','2019-11-04 09:00:00','2019-11-04 10:00:00','','#ff39cf',NULL,NULL,'Absent, notice',1,'Custom','On Date','','2019-11-17','Specific Days','',0,1,0,1,0,0,0,'899','jilljackson@mail.com',20,60,'2019-11-04 09:00:00',NULL,'Calendar',0,NULL,NULL,'Session with Hermione Grainger',NULL,'John Jackson','Hermione Grainger'),(900,'','Billable','','','2019-11-06 09:00:00','2019-11-06 10:00:00','','#ff39cf',NULL,NULL,'Absent, no notice ($)',1,'Custom','On Date','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'899','jilljackson@mail.com',20,60,'2019-11-06 09:00:00',NULL,'Calendar',0,NULL,NULL,'Session with Hermione Grainger',NULL,'John Jackson','Hermione Grainger'),(901,'','Billable','','','2019-11-11 09:00:00','2019-11-11 10:00:00','','#ff39cf',NULL,NULL,NULL,1,'Custom','On Date','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'899','jilljackson@mail.com',20,60,'2019-11-11 09:00:00',NULL,'Calendar',0,NULL,NULL,'Session with Hermion Grainger',NULL,'John Jackson','Hermione Grainger'),(902,'','Billable','','','2019-11-13 09:00:00','2019-11-13 10:00:00','','#ff39cf','hh',NULL,'Present ($)',1,'Custom','On Date','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'899','jilljackson@mail.com',20,60,'2019-11-13 09:00:00',NULL,'Calendar',0,NULL,NULL,'Session with Hermione Grainger',NULL,'John Jackson','Hermione Grainger'),(903,'','Billable','','','2019-11-12 15:00:00','2019-11-12 16:00:00','','#b8e986',NULL,NULL,NULL,0,'false','','','2019-11-12','','',0,0,0,0,0,0,0,'903','',0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Joe Jackson,Joan Jackson','Hermione Grainger,Jennifer Robinson'),(904,'','Billable','','','2019-11-19 14:00:00','2019-11-19 15:00:00','','',NULL,NULL,'Absent, notice',0,'','','','2019-11-21','','',0,0,0,0,0,0,0,'904','',0,0,'2019-11-19 14:00:00',NULL,'Calendar',NULL,NULL,NULL,'Session with Jennifer Robinson',NULL,'Jaren Jones','Jennifer Robinson'),(905,'','Billable','','','2019-11-08 09:00:00','2019-11-08 10:00:00','','',NULL,NULL,'Absent, no notice ($)',1,'Weekly','On Date','','2019-11-30','','',0,0,0,0,0,0,0,'905','',0,0,'2019-11-08 09:00:00',NULL,'Calendar',NULL,NULL,NULL,'Session with Joe Bob',NULL,'Jaren Jones','Joe Bob'),(906,'','Billable','','','2019-11-15 09:00:00','2019-11-15 10:00:00','','',NULL,NULL,'Present ($)',1,'Weekly','On Date','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'905','',0,0,'2019-11-15 09:00:00',NULL,'Calendar',NULL,NULL,NULL,'Session with Joe Bob',NULL,'Jaren Jones','Joe Bob'),(907,'','Billable','','','2019-11-22 09:00:00','2019-11-22 10:00:00','','','m m',NULL,'Present ($)',1,'Weekly','On Date','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'905','',0,0,'2019-11-22 09:00:00',NULL,'Calendar',NULL,NULL,NULL,'Session with Joe Bob',NULL,'Jaren Jones','Joe Bob'),(908,'','Billable','','','2019-11-29 09:00:00','2019-11-29 10:00:00','','',NULL,NULL,NULL,1,'Weekly','On Date','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'905','',0,0,'2019-11-29 09:00:00',NULL,'Calendar',NULL,NULL,NULL,'Session with Joe Bob',NULL,'Jaren Jones','Joe Bob'),(909,'','Billable','','','2019-11-21 14:00:00','2019-11-21 15:00:00','','#109bf2',NULL,NULL,NULL,1,'Weekly','After','3','2019-11-21','','',0,0,0,0,0,0,0,'909','istark@mail.com',20,60,'2019-11-21 14:00:00',NULL,'Calendar',0,NULL,NULL,'Session with Joe Bob',NULL,'Ian Stark','Joe Bob'),(910,'','Billable','','','2019-11-28 14:00:00','2019-11-28 15:00:00','','#109bf2',NULL,NULL,NULL,1,'Weekly','After','3',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'909','istark@mail.com',20,60,'2019-11-28 14:00:00',NULL,'Calendar',0,NULL,NULL,'Session with Joe Bob',NULL,'Ian Stark','Joe Bob'),(911,'','Billable','','','2019-12-05 14:00:00','2019-12-05 15:00:00','','#109bf2',NULL,NULL,'Absent, no notice ($)',1,'Weekly','After','3',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'909','istark@mail.com',20,60,'2019-12-05 14:00:00',NULL,'Calendar',0,NULL,NULL,'Session with Joe Bob',NULL,'Ian Stark','Joe Bob'),(912,'','Billable','','','2019-11-21 14:00:00','2019-11-21 15:00:00','','',NULL,NULL,NULL,1,'Weekly','After','3','2019-11-21','','',0,0,0,0,0,0,0,'912','',0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Joe Jackson','Hermione Grainger'),(913,'','Billable','','','2019-11-28 14:00:00','2019-11-28 15:00:00','','',NULL,NULL,NULL,1,'Weekly','After','3',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'912','',0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Joe Jackson','Hermione Grainger'),(914,'','Billable','','','2019-12-05 14:00:00','2019-12-05 15:00:00','','',NULL,NULL,NULL,1,'Weekly','After','3',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'912','',0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Joe Jackson','Hermione Grainger'),(915,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(918,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'bjoe@mail.com',0,NULL,'2019-11-21 00:00:00','Bob Joe','Payment',1000,'Cash','2019-11-21','Payment',NULL,NULL,NULL),(920,'','Billable','','','2019-11-21 15:20:00','2019-11-21 15:52:00','','#b8e986',NULL,NULL,'Present ($)',0,'false','','','2019-11-21','','',0,0,0,0,0,0,0,'920','jilljackson@mail.com',20,60,'2019-11-21 15:20:00',NULL,'Calendar',0,NULL,NULL,'Session with Hermione Grainger',NULL,'John Jackson','Hermione Grainger'),(937,'','','','','2019-11-24 10:30:00','2019-11-24 11:30:00','','','ddd',NULL,'Absent, no notice ($)',0,'false','','','2019-11-24','','',0,0,0,0,0,0,0,'937','',0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Sarah Silver','Hermione Grainger'),(938,'','Billable','','','2019-11-24 10:30:00','2019-11-24 11:30:00','','','vv',NULL,'Absent, notice',0,'','','','2019-11-24','','',0,0,0,0,0,0,0,'938','',0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Jaren Jones','Hermione Grainger'),(939,'','Billable','','','2019-11-24 09:30:00','2019-11-24 10:30:00','','','ss',NULL,'Present ($)',0,'','','','2019-11-24','','',0,0,0,0,0,0,0,'939','',0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Sarah Silver','Hermione Grainger'),(984,'','Billable','','','2019-12-10 17:10:00','2019-12-10 18:10:00','','',NULL,NULL,'Present ($)',1,'Daily','After','3','2019-12-10','','',0,0,0,0,0,0,0,'984','',0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Sarah Silver','Hermione Grainger'),(985,'','Billable','','','2019-12-11 17:10:00','2019-12-11 18:10:00','','',NULL,NULL,'Absent, no notice ($)',1,'Daily','After','3',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'984','',0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Sarah Silver','Hermione Grainger'),(986,'','Billable','','','2019-12-12 17:10:00','2019-12-12 18:10:00','','',NULL,NULL,'Absent, notice',1,'Daily','After','3',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'984','',0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Sarah Silver','Hermione Grainger'),(10006,'','Billable','','','2019-12-27 14:48:00','2019-12-27 15:48:00','ttt','#109bf2','bhbhb','2019-12-28','Present ($)',0,'null','null','null','2019-12-27','','null',0,0,0,0,0,0,0,'10006','',0,0,NULL,NULL,'Calendar',NULL,NULL,'2019-12-27',NULL,NULL,'Billy Joe','Hermione Grainger'),(10008,'','Billable','','','2020-01-11 15:03:00','2020-01-11 16:03:00','','',NULL,NULL,'Absent, no notice ($)',0,'false','','','2020-01-11','','',0,0,0,0,0,0,0,'10008','ssilver@mail.com',20,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'John Jackson,Ian Stark','Hermione Grainger,Joe Bob'),(10009,'','Billable','','','2020-01-14 17:47:00','2020-01-14 18:47:00','','',NULL,NULL,NULL,1,'Weekly','After','3','2020-01-14','','',0,0,0,0,0,0,0,'10009','',0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Jaren Jones,John Jackson','Hermionevfv Grainger,Joe Bob'),(10010,'','Billable','','','2020-01-21 17:47:00','2020-01-21 18:47:00','','',NULL,NULL,'Absent, notice',1,'Weekly','After','3',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'10009','',0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Jaren Jones,John Jackson','Hermionevfv Grainger,Joe Bob'),(10011,'','Billable','','','2020-01-28 17:47:00','2020-01-28 18:47:00','','',NULL,NULL,NULL,1,'Weekly','After','3',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'10009','',0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Jaren Jones,John Jackson','Hermionevfv Grainger,Joe Bob'),(10012,'','Billable','','','2020-01-20 17:47:00','2020-01-20 18:47:00','','',NULL,NULL,NULL,1,'Weekly','After','3',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'10009','',0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Jaren Jones,John Jackson','Hermionevfv Grainger,Joe Bob'),(10018,'','Billable','','','2020-01-22 16:57:00','2020-01-22 17:57:00','','',NULL,NULL,NULL,0,'false','','','2020-01-22','','',0,0,0,0,0,0,0,'10018','',0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Sarah Silver','Hermione Grainger'),(10019,'','Billable','','','2020-01-23 06:30:00','2020-01-23 07:00:00','','',NULL,NULL,NULL,0,'false','','','2020-01-23','','',0,0,0,0,0,0,0,'10019','',0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Sarah Silver','Hermione Grainger'),(10020,'','Billable','','','2020-01-24 00:31:00','2020-01-24 01:31:00','','',NULL,NULL,NULL,0,'false','','','2020-01-24','','',0,0,0,0,0,0,0,'10020','',0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Sarah Silver','Harry Potter'),(10026,'','Billable','','','2020-01-25 14:53:00','2020-01-25 15:53:00','','',NULL,NULL,NULL,0,'false','','','2020-01-25','','',0,0,0,0,0,0,0,'10026','',0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Sarah Silver','Joe Bob');
/*!40000 ALTER TABLE `testevent` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-28  1:07:35
