/*
Author: David RiderDate: 10/4/2018
Class: CS 340
*/
USE DATABASE cs340_riderda;
DROP TABLE IF EXISTS `student`;
/*Student table: contains basic data about students*/
CREATE TABLE `student` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`s_name` varchar(255) NOT NULL,
	`s_level` int(11) NOT NULL,
	`s_group` varchar(255) NOT NULL,
	`dob` DATETIME NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB;

DROP TABLE IF EXISTS `room`;
CREATE TABLE `room` (
	`room_id` int (11) NOT NULL AUTO_INCREMENT,
	`room_number` int (11) NOT NULL,
	`room_name` varchar(255) NOT NULL,
	PRIMARY KEY (`room_id`),
	UNIQUE KEY (`room_number`)
) ENGINE=InnoDB;

DROP TABLE IF EXISTS `class`;
CREATE TABLE `class` (
	`class_code` int(11) NOT NULL, 
	`class_name` varchar(255) NOT NULL,
	`room_number` int (11),
	`homeroom_teacher` varchar(255),
	PRIMARY KEY (`class_code`),
	FOREIGN KEY (`room_number`) REFERENCES room(`room_number`)
) ENGINE=InnoDB;

DROP TABLE IF EXISTS `subject`;
CREATE TABLE `subject` (
	`subject_code` int(11) NOT NULL AUTO_INCREMENT,
	`subject_name` varchar(255) NOT NULL,
	`room_number` int(11),
	`subject_teacher` varchar(255),
	PRIMARY KEY (`subject_code`),
	FOREIGN KEY (`room_number`) REFERENCES room(`room_number`)
) ENGINE=InnoDB;
/*RELATIONSHIPS*/
DROP TABLE IF EXISTS `student_member_of_class`;
CREATE TABLE `student_member_of_class` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`student_id` int(11) NOT NULL,
	`class_code` int(11) NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB;

ALTER TABLE `student_member_of_class`
	ADD CONSTRAINT `student_member_of_class_stu` FOREIGN KEY (`student_id`) 
REFERENCES `student` (`id`) ON DELETE CASCADE,
	ADD CONSTRAINT `student_member_of_class` FOREIGN KEY (`class_code`)
REFERENCES `class` (`class_code`) ON DELETE CASCADE;

DROP TABLE IF EXISTS `student_studies_subject`;
CREATE TABLE `student_studies_subject` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`student_id` int(11) NOT NULL,
	`subject_code` int(11) NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB;

ALTER TABLE `student_studies_subject`
	ADD CONSTRAINT `student_studies_subject_stu` FOREIGN KEY (`student_id`)
REFERENCES `student` (`id`) ON DELETE CASCADE,
	ADD CONSTRAINT `student_studies_subject_sub` FOREIGN KEY (`subject_code`)
REFERENCES `subject` (`subject_code`) ON DELETE CASCADE;

DROP TABLE IF EXISTS `subject_taught_in_room`;
CREATE TABLE `subject_taught_in_room` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`subject_code` int(11) NOT NULL,
	`room_number` int(11) NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB;

ALTER TABLE `subject_taught_in_room`
	ADD CONSTRAINT `subject_taught_in_room_sub` FOREIGN KEY (`subject_code`)
REFERENCES `subject` (`subject_code`) ON DELETE CASCADE,
	ADD CONSTRAINT `subject_taught_in_room_rom` FOREIGN KEY (`room_number`)
REFERENCES `room` (`room_id`) ON DELETE CASCADE;

DROP TABLE IF EXISTS `class_located_in_room`;
CREATE TABLE `class_located_in_room` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`class_code` int(11) NOT NULL,
	`room_number` int(11) NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB;

ALTER TABLE `class_located_in_room`
	ADD CONSTRAINT `class_located_in_room_cla` FOREIGN KEY (`class_code`)
REFERENCES `class` (`class_code`) ON DELETE CASCADE,
	ADD CONSTRAINT `class_located_in_room_rom` FOREIGN KEY (`room_number`)
REFERENCES `room` (`room_id`) ON DELETE CASCADE;

INSERT INTO `student` VALUES 
(1, 'Kim Min-su', 82, 'A', 20050518), 
(2, 'Yang Jae-Min', 77, 'B', 20050129), 
(3, 'Park Ga-yeon', 91, 'A', 20050907), 
(4, 'Seung Go-gan', 62, 'B', 20050503), 
(5, 'Kim Su-hyeon', 95, 'A', 20050415), 
(6, 'Min Chae-yeon', 87, 'B', 20050102), 
(7, 'Park Min-ju', 63, 'A', 20051204), 
(8, 'So Young-jae', 77, 'B', 20050527),
(9, 'Yang Min-su', 81, 'A', 20050317), 
(10, 'Lim Jae-Min', 78, 'B', 20051228), 
(11, 'Min Ga-yeon', 90, 'A', 20050704), 
(12, 'Kim Go-gan', 64, 'B', 20050402), 
(13, 'Park Su-hyeon', 97, 'A', 20050314), 
(14, 'Kwan Chae-yeon', 88, 'B', 20051201), 
(15, 'Moon Min-ju', 69, 'A', 20051103), 
(16, 'Lee Young-jae', 73, 'B', 20050426),
(17, 'Park Min-su', 84, 'A', 20050519), 
(18, 'Kwan Jae-Min', 80, 'B', 20050130), 
(19, 'Kim Ga-yeon', 96, 'A', 20050908), 
(20, 'Yang Go-gan', 84, 'B', 20050504), 
(21, 'Lim Su-hyeon', 91, 'A', 20050416), 
(22, 'Song Chae-yeon', 82, 'B', 20050103), 
(23, 'Gong Min-ju', 93, 'A', 20051205), 
(24, 'Yang Young-jae', 84, 'B', 20050528);
INSERT INTO `room` VALUES (1, 301, 'Faith'), (2, 302, 'Hope'), (3, 303, 'Love'), (4, 304, 'L Hub 5');
INSERT INTO `class` VALUES (1, '5-F', 301, 'Mr. Jo'), (2, '5-H', 302, 'Mr. Moon'), (3, '5-L', 303, 'Ms. Kim');
INSERT INTO `subject` VALUES  (1, 'Science', 301, 'Mr. Rider'), (2, 'History', 302, 'Mr. Steele'), (3, 'Low LA', 303, 'Mr. Steele'), (4, 'High LA', 304, 'Mr. Rider');

INSERT INTO `student_member_of_class` (`id`, `student_id`, `class_code`) VALUES (1, 1, 1), (2, 2, 2),(3, 3, 3),(4, 4, 1),(5, 5, 2),(6, 6, 3),(7, 7, 1),(8, 8, 2),(9, 9, 3),(10, 10, 1),(11, 11, 2),(12, 12, 3),(13, 13, 1),(14, 14, 2),(15, 15, 3),(16, 16, 1),(17, 17, 2),(18, 18, 3),(19, 19, 1),(20, 20, 2),(21, 21, 3),(22, 22, 1),(23, 23, 2),(24, 24, 3);
INSERT INTO `student_studies_subject` (`id`, `student_id`, `subject_code`) VALUES (1, 1, 1), (2, 1, 2), (3, 1, 3), (4, 2, 1), (5, 2, 4), (6, 3, 1), (7, 3, 3), (8, 4, 1), (9, 4, 4), (10, 5, 1), (11, 5, 2), (12, 6, 3), (13, 6, 2), (14, 7, 1);
INSERT INTO `subject_taught_in_room` (`id`, `subject_code`, `room_number`) VALUES (1, 1, 1), (2, 2, 2), (3, 3, 3), (4, 4, 4);
INSERT INTO `class_located_in_room` (`id`, `class_code`, `room_number`) VALUES (1, 1, 1), (2, 2, 3), (3, 3, 3);