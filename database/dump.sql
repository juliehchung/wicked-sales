-- MySQL dump 10.13  Distrib 5.7.27, for Linux (x86_64)
--
-- Host: localhost    Database: borker
-- ------------------------------------------------------
-- Server version	5.7.27-0ubuntu0.18.04.1

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
-- Table structure for table `cartItems`
--

DROP TABLE IF EXISTS `cartItems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cartItems` (
  `cartItemId` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `cartId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  PRIMARY KEY (`cartItemId`),
  UNIQUE KEY `SECONDARY` (`cartId`,`productId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=356 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cartItems`
--

LOCK TABLES `cartItems` WRITE;
/*!40000 ALTER TABLE `cartItems` DISABLE KEYS */;
/*!40000 ALTER TABLE `cartItems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carts` (
  `cartId` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`cartId`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `orderId` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `cartId` int(11) NOT NULL,
  `fullName` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `cardHolder` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `card` varchar(16) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` varchar(16) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cvv` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`orderId`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `productId` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` int(11) NOT NULL,
  `image` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `shortDescription` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `longDescription` text COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`productId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Plaid Bow Tie Collar & Leash Set',995,'/images/plaid-bow-tie.jpg','Lumberjack Red & Black Buffalo Plaid Leash, with Bow Tie Collar','Red & black buffalo plaid print, flannel look, the perfect addition to your dog\'s wardrobe. Plaid has never looked so good! A classic dog leash and bow tie collar, for the most dapper of dogs! This leash is made from highly durable designer fabric, and strong webbing for durability. Pictured is a 6 ft leash that is 1 inch wide, featuring silver chrome snap-hook hardware.'),(2,'Pink Floral Collar',2000,'/images/floral-collar.jpg','Custom Engraved Pink Floral Dog Collar','Handcrafted in the USA and made to order. Each dog collar is individually made, one at a time, from beginning to end, using the finest fabrics and materials available. Every aspect of your dog\'s collar is given sincere effort to craft the finest collar you will ever own. You get the same great quality with every purchase.'),(3,'La Croix ID Tag',600,'/images/la-croix-tag.jpg','La Croix Pamplemousse Sparkling Water ID tag ','Are you a super cool pet parent who also happens to be a fizzy water geek? Celebrate being both with our exclusive La Croix Pamplemousse pet ID tag! Laser-etched and hand-painted to order, these tags will suit all furry friends of all sizes.'),(4,'Pocket Shiba T-Shirt',2595,'/images/pocket-shiba-shirt.jpg','Black Shiba Inu Pocket Shirt, One Size Fits All','Grab this funny Shiba Inu Pocket Shirt as a gift for that one friend or family member who loves shiba inu! Wear this pocket doge shirt and show your dog that fits in your pocket! This shiba inu lover shirt is perfect present for Christmas, New Year or Birthday! Make: 100% ringspun cotton, 4.5 oz (153 g/m2), Pre-shrunk, Shoulder-to-shoulder taping, Quarter-turned to avoid crease down the center'),(5,'Pug Coffee Mug',1031,'/images/pug-mug.jpg','It\'s Coffee Time Pug Mug','Capacity: 15 Fluid ounces, 100% pure white ceramic great gift idea for coffee or tea addicts who will appreciate for years. STURDY CERAMIC THAT LASTS: our classic white ceramic mug is built to stand up to the daily use we know a well-loved mug receives. Plus it\'s dishwasher and microwave safe because anyone using this mug is too awesome to spend time washing dishes or waiting for water to boil on the stove. SCRATCH RESISTANT PRINT: the coffee mug is featured printing on both sides. We use the finest ceramic and our images are kiln fired at up to 1350 degrees. This process ensures a mug that will last a long time without scratching or fading.'),(6,'Blush Pink Gingham Toy',1600,'/images/pink-flannel-toy.jpg','Blush Pink Gingham Dog Chew Toy','These squeaker toys are such fun for pups! These stylish and functional dog toys are handcrafted, as always, mindful of dogs and their humans. Your dog will love them, and you won\'t mind seeing these chic toys lying around your home. Size: Approx. 10\" x 5\". Crafted with the upholstery grade fabrics used in dog bedding. Padded with the same fill used in dog mats. Equipped with a heavy duty squeaker. Stitched and top-stitched for enhanced durability.\r\n\r\n');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-02 22:00:35
