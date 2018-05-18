
-- CREATE TABLE `aiabancgen`.`synoptic` (
--   `IDSynoptic` INT NOT NULL,
--   `title` VARCHAR(150) NULL,
--   `date` VARCHAR(45) NULL,
--   `description` VARCHAR(200) NULL,
--   `creator` VARCHAR(45) NULL,
--   `IDImage` INT NULL,
--   `zoom` DECIMAL(2,2) NULL,
--   PRIMARY KEY (`IDSynoptic`));


CREATE TABLE `aiabancgen`.`synoptic` (
  `idSynoptic` INT NOT NULL AUTO_INCREMENT,
  `date` DATE NULL,
  `description` TEXT(250) NULL,
  `creator` VARCHAR(45) NULL,
  `zoom` DECIMAL(2,2) NULL,
  `image` LONGTEXT NULL,
  `position_x` DECIMAL(18,2) NULL,
  `position_y` DECIMAL(18,2) NULL,
  PRIMARY KEY (`idSynoptic`));