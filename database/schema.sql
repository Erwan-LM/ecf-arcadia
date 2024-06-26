-- Configuration de l'utilisateur root et création de la base de données
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
FLUSH PRIVILEGES;

CREATE DATABASE IF NOT EXISTS ecf_zoo;
USE ecf_zoo;

-- Création de la table habitat_biom
CREATE TABLE IF NOT EXISTS habitat_biom (
    id INT AUTO_INCREMENT PRIMARY KEY,
    habitat VARCHAR(50) NOT NULL,
    animal VARCHAR(50) NOT NULL,
    photo_path VARCHAR(255) NOT NULL,
    photo_hash VARCHAR(64)
);

-- Insérer les images pour l'habitat "Savane"
INSERT INTO habitat_biom (habitat, animal, photo_path, photo_hash) VALUES ('Savane', 'zebre', 'assets/savane_01.jpg', SHA2('assets/savane_01.jpg', 256));
INSERT INTO habitat_biom (habitat, animal, photo_path, photo_hash) VALUES ('Savane', 'panda-roux', 'assets/savane_02.jpg', SHA2('assets/savane_02.jpg', 256));
INSERT INTO habitat_biom (habitat, animal, photo_path, photo_hash) VALUES ('Savane', 'girafe', 'assets/savane_03.jpg', SHA2('assets/savane_03.jpg', 256));
INSERT INTO habitat_biom (habitat, animal, photo_path, photo_hash) VALUES ('Savane', 'panthere', 'assets/savane_04.jpg', SHA2('assets/savane_04.jpg', 256));
INSERT INTO habitat_biom (habitat, animal, photo_path, photo_hash) VALUES ('Savane', 'peroquet', 'assets/savane_05.jpg', SHA2('assets/savane_05.jpg', 256));
INSERT INTO habitat_biom (habitat, animal, photo_path, photo_hash) VALUES ('Savane', 'rhinoceros', 'assets/savane_06.jpg', SHA2('assets/savane_06.jpg', 256));
INSERT INTO habitat_biom (habitat, animal, photo_path, photo_hash) VALUES ('Savane', 'koudou', 'assets/savane_07.jpg', SHA2('assets/savane_07.jpg', 256));
INSERT INTO habitat_biom (habitat, animal, photo_path, photo_hash) VALUES ('Savane', 'hyène', 'assets/savane_08.jpg', SHA2('assets/savane_08.jpg', 256));
INSERT INTO habitat_biom (habitat, animal, photo_path, photo_hash) VALUES ('Savane', 'elephant', 'assets/savane_09.jpg', SHA2('assets/savane_09.jpg', 256));
INSERT INTO habitat_biom (habitat, animal, photo_path, photo_hash) VALUES ('Savane', 'pogona', 'assets/savane_10.jpg', SHA2('assets/savane_10.jpg', 256));

-- Insérer les images pour l'habitat "Tropic"
INSERT INTO habitat_biom (habitat, animal, photo_path, photo_hash) VALUES ('Tropic', 'dragon-de-komodo', 'assets/tropic_01.jpg', SHA2('assets/tropic_01.jpg', 256));
INSERT INTO habitat_biom (habitat, animal, photo_path, photo_hash) VALUES ('Tropic', 'ara', 'assets/tropic_02.jpg', SHA2('assets/tropic_02.jpg', 256));
INSERT INTO habitat_biom (habitat, animal, photo_path, photo_hash) VALUES ('Tropic', 'pan', 'assets/tropic_03.jpg', SHA2('assets/tropic_03.jpg', 256));
INSERT INTO habitat_biom (habitat, animal, photo_path, photo_hash) VALUES ('Tropic', 'singe', 'assets/tropic_04.jpg', SHA2('assets/tropic_04.jpg', 256));
INSERT INTO habitat_biom (habitat, animal, photo_path, photo_hash) VALUES ('Tropic', 'papillon', 'assets/tropic_05.jpg', SHA2('assets/tropic_05.jpg', 256));
INSERT INTO habitat_biom (habitat, animal, photo_path, photo_hash) VALUES ('Tropic', 'macaque', 'assets/tropic_06.jpg', SHA2('assets/tropic_06.jpg', 256));
INSERT INTO habitat_biom (habitat, animal, photo_path, photo_hash) VALUES ('Tropic', 'kameleon', 'assets/tropic_07.jpg', SHA2('assets/tropic_07.jpg', 256));
INSERT INTO habitat_biom (habitat, animal, photo_path, photo_hash) VALUES ('Tropic', 'elephant', 'assets/tropic_08.jpg', SHA2('assets/tropic_08.jpg', 256));
INSERT INTO habitat_biom (habitat, animal, photo_path, photo_hash) VALUES ('Tropic', 'oiseau-bleu', 'assets/tropic_09.jpg', SHA2('assets/tropic_09.jpg', 256));
INSERT INTO habitat_biom (habitat, animal, photo_path, photo_hash) VALUES ('Tropic', 'maki-cata', 'assets/tropic_10.jpg', SHA2('assets/tropic_10.jpg', 256));

-- Insérer les images pour l'habitat "Aqua"
INSERT INTO habitat_biom (habitat, animal, photo_path, photo_hash) VALUES ('Aqua', 'carpe', 'assets/aqua_01.jpg', SHA2('assets/aqua_01.jpg', 256));
INSERT INTO habitat_biom (habitat, animal, photo_path, photo_hash) VALUES ('Aqua', 'poisson', 'assets/aqua_02.jpg', SHA2('assets/aqua_02.jpg', 256));
INSERT INTO habitat_biom (habitat, animal, photo_path, photo_hash) VALUES ('Aqua', 'requin', 'assets/aqua_03.jpg', SHA2('assets/aqua_03.jpg', 256));
INSERT INTO habitat_biom (habitat, animal, photo_path, photo_hash) VALUES ('Aqua', 'manchot', 'assets/aqua_04.jpg', SHA2('assets/aqua_04.jpg', 256));
INSERT INTO habitat_biom (habitat, animal, photo_path, photo_hash) VALUES ('Aqua', 'raie', 'assets/aqua_05.jpg', SHA2('assets/aqua_05.jpg', 256));
INSERT INTO habitat_biom (habitat, animal, photo_path, photo_hash) VALUES ('Aqua', 'poisson-clown', 'assets/aqua_06.jpg', SHA2('assets/aqua_06.jpg', 256));
INSERT INTO habitat_biom (habitat, animal, photo_path, photo_hash) VALUES ('Aqua', 'meduse', 'assets/aqua_07.jpg', SHA2('assets/aqua_07.jpg', 256));
INSERT INTO habitat_biom (habitat, animal, photo_path, photo_hash) VALUES ('Aqua', 'phoque', 'assets/aqua_08.jpg', SHA2('assets/aqua_08.jpg', 256));
INSERT INTO habitat_biom (habitat, animal, photo_path, photo_hash) VALUES ('Aqua', 'pingouin', 'assets/aqua_09.jpg', SHA2('assets/aqua_09.jpg', 256));
INSERT INTO habitat_biom (habitat, animal, photo_path, photo_hash) VALUES ('Aqua', 'poisson-lion', 'assets/aqua_10.jpg', SHA2('assets/aqua_10.jpg', 256));

-- Insérer les images pour l'habitat "Prairie"
INSERT INTO habitat_biom (habitat, animal, photo_path, photo_hash) VALUES ('Prairie', 'rhino', 'assets/prairie_01.jpg', SHA2('assets/prairie_01.jpg', 256));
INSERT INTO habitat_biom (habitat, animal, photo_path, photo_hash) VALUES ('Prairie', 'lapin', 'assets/prairie_02.jpg', SHA2('assets/prairie_02.jpg', 256));
INSERT INTO habitat_biom (habitat, animal, photo_path, photo_hash) VALUES ('Prairie', 'buffle', 'assets/prairie_03.jpg', SHA2('assets/prairie_03.jpg', 256));
INSERT INTO habitat_biom (habitat, animal, photo_path, photo_hash) VALUES ('Prairie', 'porc-epic', 'assets/prairie_04.jpg', SHA2('assets/prairie_04.jpg', 256));
INSERT INTO habitat_biom (habitat, animal, photo_path, photo_hash) VALUES ('Prairie', 'lupus', 'assets/prairie_05.jpg', SHA2('assets/prairie_05.jpg', 256));
INSERT INTO habitat_biom (habitat, animal, photo_path, photo_hash) VALUES ('Prairie', 'biche', 'assets/prairie_06.jpg', SHA2('assets/prairie_06.jpg', 256));
INSERT INTO habitat_biom (habitat, animal, photo_path, photo_hash) VALUES ('Prairie', 'panda-roux', 'assets/prairie_07.jpg', SHA2('assets/prairie_07.jpg', 256));
INSERT INTO habitat_biom (habitat, animal, photo_path, photo_hash) VALUES ('Prairie', 'bongo', 'assets/prairie_08.jpg', SHA2('assets/prairie_08.jpg', 256));
INSERT INTO habitat_biom (habitat, animal, photo_path, photo_hash) VALUES ('Prairie', 'panda', 'assets/prairie_09.jpg', SHA2('assets/prairie_09.jpg', 256));
INSERT INTO habitat_biom (habitat, animal, photo_path, photo_hash) VALUES ('Prairie', 'taureau', 'assets/prairie_10.jpg', SHA2('assets/prairie_10.jpg', 256));

-- Insérer les images pour l'habitat "Monts"
INSERT INTO habitat_biom (habitat, animal, photo_path, photo_hash) VALUES ('Monts', 'chevre', 'assets/monts_01.jpg', SHA2('assets/monts_01.jpg', 256));
INSERT INTO habitat_biom (habitat, animal, photo_path, photo_hash) VALUES ('Monts', 'biquette-chamoisee', 'assets/monts_02.jpg', SHA2('assets/monts_02.jpg', 256));
INSERT INTO habitat_biom (habitat, animal, photo_path, photo_hash) VALUES ('Monts', 'isard', 'assets/monts_03.jpg', SHA2('assets/monts_03.jpg', 256));
INSERT INTO habitat_biom (habitat, animal, photo_path, photo_hash) VALUES ('Monts', 'lynx', 'assets/monts_04.jpg', SHA2('assets/monts_04.jpg', 256));
INSERT INTO habitat_biom (habitat, animal, photo_path, photo_hash) VALUES ('Monts', 'loup', 'assets/monts_05.jpg', SHA2('assets/monts_05.jpg', 256));
INSERT INTO habitat_biom (habitat, animal, photo_path, photo_hash) VALUES ('Monts', 'felin', 'assets/monts_06.jpg', SHA2('assets/monts_06.jpg', 256));
INSERT INTO habitat_biom (habitat, animal, photo_path, photo_hash) VALUES ('Monts', 'ours', 'assets/monts_07.jpg', SHA2('assets/monts_07.jpg', 256));
INSERT INTO habitat_biom (habitat, animal, photo_path, photo_hash) VALUES ('Monts', 'gorille', 'assets/monts_08.jpg', SHA2('assets/monts_08.jpg', 256));
INSERT INTO habitat_biom (habitat, animal, photo_path, photo_hash) VALUES ('Monts', 'marmotte', 'assets/monts_09.jpg', SHA2('assets/monts_09.jpg', 256));
INSERT INTO habitat_biom (habitat, animal, photo_path, photo_hash) VALUES ('Monts', 'panda', 'assets/monts_10.jpg', SHA2('assets/monts_10.jpg', 256));
