-- Configuration de l'utilisateur root et création de la base de données
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
FLUSH PRIVILEGES;

CREATE DATABASE IF NOT EXISTS Arcadia;
USE Arcadia;

-- Table utilisateur
CREATE TABLE IF NOT EXISTS utilisateur (
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    nom VARCHAR(50) NOT NULL,
    prenom VARCHAR(50) NOT NULL,
    PRIMARY KEY (username)
);

-- Insérer les utilisateurs dans la table utilisateur
INSERT INTO utilisateur (username, password, nom, prenom) VALUES 
('jose.arcadia', 'password123', 'Arcadia', 'José'),
('alice.durant', 'password456', 'Durant', 'Alice'),
('benjamin.leclerc', 'password789', 'Leclerc', 'Benjamin'),
('caroline.martin', 'password101', 'Martin', 'Caroline'),
('david.brun', 'password102', 'Brun', 'David');


-- Table role
CREATE TABLE IF NOT EXISTS role (
    role_id INT AUTO_INCREMENT,
    label VARCHAR(50) NOT NULL,
    PRIMARY KEY (role_id)
);

-- Insérer les rôles dans la table role
INSERT INTO role (label) VALUES 
('Administrateur'),
('Employée'),
('Vétérinaire');

-- Table utilisateur_role
CREATE TABLE IF NOT EXISTS utilisateur_role (
    username VARCHAR(50) NOT NULL,
    role_id INT NOT NULL,
    PRIMARY KEY (username, role_id),
    FOREIGN KEY (username) REFERENCES utilisateur(username) 
        ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES role(role_id)
        ON DELETE CASCADE
);

-- Associer les utilisateurs à leurs rôles
INSERT INTO utilisateur_role (username, role_id) VALUES 
('jose.arcadia', 1),  -- Administrateur
('alice.durant', 3),  -- Vétérinaire
('benjamin.leclerc', 2),  -- Employée
('caroline.martin', 2),  -- Employée
('david.brun', 2);  -- Employée

-- Table rapport_veterinaire
CREATE TABLE IF NOT EXISTS rapport_veterinaire (
    rapport_veterinaire_id INT AUTO_INCREMENT,
    date DATE NOT NULL,
    detail VARCHAR(255) NOT NULL,
    username VARCHAR(50),  -- Lien vers utilisateur
    PRIMARY KEY (rapport_veterinaire_id),
    FOREIGN KEY (username) REFERENCES utilisateur(username)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

-- Insérer des rapports vétérinaires dans la table rapport_veterinaire
INSERT INTO rapport_veterinaire (date, detail, username) VALUES 
('2024-09-01', 'Vérification de santé générale des animaux.', 'alice.durant'),
('2024-09-10', 'Vaccine pour les animaux de la savane.', 'alice.durant'),
('2024-09-15', 'Contrôle de l’alimentation des animaux marins.', 'alice.durant'),
('2024-09-20', 'Observation des comportements des animaux nocturnes.', 'alice.durant'),
('2024-09-25', 'Préparation des examens de santé mensuels.', 'alice.durant');



-- Table habitat
CREATE TABLE IF NOT EXISTS habitat (
    habitat_id INT AUTO_INCREMENT,
    nom VARCHAR(50) NOT NULL,
    description VARCHAR(255) NOT NULL,
    commentaire_habitat VARCHAR(255),
    PRIMARY KEY (habitat_id)
);
-- Insérer les habitats dans la table habitat
INSERT INTO habitat (nom, description, commentaire_habitat) VALUES 
('Tropic', 'Un habitat luxuriant rempli de plantes tropicales et d’animaux exotiques.', 'Attention aux singes, ils adorent les chapeaux !'),
('Savane', 'Une vaste plaine parsemée d’herbes hautes et de grands animaux comme les lions et les éléphants.', 'Saviez-vous que les lions dorment en moyenne 20 heures par jour ? La vie est belle !'),
('Océan', 'Un monde aquatique peuplé de poissons colorés, de coraux et de mammifères marins.', 'Si les poissons pouvaient parler, ils nous raconteraient des histoires incroyables !'),
('Montagne', 'Un habitat alpin avec des paysages spectaculaires et des animaux comme les chèvres des montagnes.', 'Ici, les chèvres sont les reines de la montagne, elles sont toujours à l’heure pour le dîner !'),
('Prairie', 'Un vaste champ ouvert où les animaux se déplacent librement, idéal pour les pique-niques.', 'Les lapins ici sont de véritables experts en cache-cache !');


-- Table race
CREATE TABLE IF NOT EXISTS race (
    race_id INT AUTO_INCREMENT,
    label VARCHAR(50) NOT NULL,
    PRIMARY KEY (race_id)
);
-- Insérer des races dans la table race
INSERT INTO race (label) VALUES 
('Zèbre'),              
('Panda-roux mâle'),     
('Girafe'),              
('Panthère'),            
('Perroquet'),           
('Rhinocéros mâle'),     
('Koudou'),              
('Hyène'),               
("Éléphant d'Europe"),   
('Pogona'),              
('Dragon-de-Komodo'),    
('Ara'),                 
('Pan'),                 
('Singe'),               
('Papillon'),            
('Macaque'),             
('Caméléon'),            
("Éléphant d'Asie"),     
('Cyanerpes cyaneus'),   
('Maki-cata'),           
('Carpe'),               
('Poisson'),             
('Requin'),              
('Manchot'),             
('Raie'),                
('Poisson-clown'),       
('Méduse'),              
('Phoque'),              
('Pingouin'),            
('Poisson-lion'),        
('Rhinocéros femelle'),  
('Lapin'),               
('Buffle'),              
('Porc-épic'),           
('Lupus'),               
('Biche'),               
('Panda-roux femelle'),  
('Bongo'),               
('Panda mal'),           
('Taureau'),             
('Chèvre'),              
('Biquette-chamoisée'),  
('Isard'),               
('Lynx'),                
('Loup'),                
('Félin'),               
('Ours'),                
('Gorille'),             
('Marmotte'),            
('Panda femelle');       

-- Table animal
CREATE TABLE IF NOT EXISTS animal (
    animal_id INT AUTO_INCREMENT,
    prenom VARCHAR(50) NOT NULL,
    etat VARCHAR(50) NOT NULL,
    race_id INT,  -- Lien vers race
    habitat_id INT,  -- Lien vers habitat
    PRIMARY KEY (animal_id),
    FOREIGN KEY (race_id) REFERENCES race(race_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (habitat_id) REFERENCES habitat(habitat_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Insérer des animaux dans la table animal
INSERT INTO animal (prenom, etat, race_id, habitat_id) VALUES 
('Zèbre', 'Sain', 1, 2),            -- Exemple : race_id 1 et habitat_id 2 pour Savane
('Panda-roux mâle', 'Sain', 2, 2),
('Girafe', 'Sain', 3, 2),
('Panthère', 'Sain', 4, 2),
('Perroquet', 'Sain', 5, 3),       -- Exemple : habitat_id 3 pour Tropic
('Rhinocéros mâle', 'Sain', 6, 2),
('Koudou', 'Sain', 7, 2),
('Hyène', 'Sain', 8, 2),
("Éléphant d'Europe", 'Sain', 9, 2),
('Pogona', 'Sain', 10, 3),
('Dragon-de-Komodo', 'Sain', 11, 3),
('Ara', 'Sain', 12, 3),
('Pan', 'Sain', 13, 3),
('Singe', 'Sain', 14, 3),
('Papillon', 'Sain', 15, 3),
('Macaque', 'Sain', 16, 2),
('Caméléon', 'Sain', 17, 3),
("Éléphant d'Asie", 'Sain', 18, 2),
('Cyanerpes cyaneus', 'Sain', 19, 3),
('Maki-cata', 'Sain', 20, 2),
('Carpe', 'Sain', 21, 3),
('Poisson', 'Sain', 22, 3),
('Requin', 'Sain', 23, 3),
('Manchot', 'Sain', 24, 3),
('Raie', 'Sain', 25, 3),
('Poisson-clown', 'Sain', 26, 3),
('Méduse', 'Sain', 27, 3),
('Phoque', 'Sain', 28, 3),
('Pingouin', 'Sain', 29, 3),
('Poisson-lion', 'Sain', 30, 3),
('Rhinocéros femelle', 'Sain', 31, 2),
('Lapin', 'Sain', 32, 2),
('Buffle', 'Sain', 33, 2),
('Porc-épic', 'Sain', 34, 2),
('Lupus', 'Sain', 35, 2),
('Biche', 'Sain', 36, 2),
('Panda-roux femelle', 'Sain', 37, 2),
('Bongo', 'Sain', 38, 2),
('Panda mal', 'Sain', 39, 2),
('Taureau', 'Sain', 40, 2),
('Chèvre', 'Sain', 41, 2),
('Biquette-chamoisée', 'Sain', 42, 2),
('Isard', 'Sain', 43, 2),
('Lynx', 'Sain', 44, 2),
('Loup', 'Sain', 45, 2),
('Félin', 'Sain', 46, 2),
('Ours', 'Sain', 47, 2),
('Gorille', 'Sain', 48, 2),
('Marmotte', 'Sain', 49, 2),
('Panda femelle', 'Sain', 50, 2);



-- Table image
CREATE TABLE IF NOT EXISTS image (
    image_id INT AUTO_INCREMENT,
    image_data BLOB,
    habitat_id INT,  -- Lien vers habitat
    PRIMARY KEY (image_id),
    FOREIGN KEY (habitat_id) REFERENCES habitat(habitat_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Insérer les images pour l'habitat "Savane"
INSERT INTO image (image_data) VALUES ('assets/savane_01.jpg');
INSERT INTO image (image_data) VALUES ('assets/savane_02.jpg');
INSERT INTO image (image_data) VALUES ('assets/savane_03.jpg');
INSERT INTO image (image_data) VALUES ('assets/savane_04.jpg');
INSERT INTO image (image_data) VALUES ('assets/savane_05.jpg');
INSERT INTO image (image_data) VALUES ('assets/savane_06.jpg');
INSERT INTO image (image_data) VALUES ('assets/savane_07.jpg');
INSERT INTO image (image_data) VALUES ('assets/savane_08.jpg');
INSERT INTO image (image_data) VALUES ('assets/savane_09.jpg');
INSERT INTO image (image_data) VALUES ('assets/savane_10.jpg');

-- Insérer les images pour l'habitat "Tropic"
INSERT INTO image (image_data) VALUES ('assets/tropic_01.jpg');
INSERT INTO image (image_data) VALUES ('assets/tropic_02.jpg');
INSERT INTO image (image_data) VALUES ('assets/tropic_03.jpg');
INSERT INTO image (image_data) VALUES ('assets/tropic_04.jpg');
INSERT INTO image (image_data) VALUES ('assets/tropic_05.jpg');
INSERT INTO image (image_data) VALUES ('assets/tropic_06.jpg');
INSERT INTO image (image_data) VALUES ('assets/tropic_07.jpg');
INSERT INTO image (image_data) VALUES ('assets/tropic_08.jpg');
INSERT INTO image (image_data) VALUES ('assets/tropic_09.jpg');
INSERT INTO image (image_data) VALUES ('assets/tropic_10.jpg');

-- Insérer les images pour l'habitat "Prairie"
INSERT INTO image (image_data) VALUES ('assets/prairie_01.jpg');
INSERT INTO image (image_data) VALUES ('assets/prairie_02.jpg');
INSERT INTO image (image_data) VALUES ('assets/prairie_03.jpg');
INSERT INTO image (image_data) VALUES ('assets/prairie_04.jpg');
INSERT INTO image (image_data) VALUES ('assets/prairie_05.jpg');
INSERT INTO image (image_data) VALUES ('assets/prairie_06.jpg');
INSERT INTO image (image_data) VALUES ('assets/prairie_07.jpg');
INSERT INTO image (image_data) VALUES ('assets/prairie_08.jpg');
INSERT INTO image (image_data) VALUES ('assets/prairie_09.jpg');
INSERT INTO image (image_data) VALUES ('assets/prairie_10.jpg');

-- Insérer les images pour l'habitat "Aqua"
INSERT INTO image (image_data) VALUES ('assets/aqua_01.jpg');
INSERT INTO image (image_data) VALUES ('assets/aqua_02.jpg');
INSERT INTO image (image_data) VALUES ('assets/aqua_03.jpg');
INSERT INTO image (image_data) VALUES ('assets/aqua_04.jpg');
INSERT INTO image (image_data) VALUES ('assets/aqua_05.jpg');
INSERT INTO image (image_data) VALUES ('assets/aqua_06.jpg');
INSERT INTO image (image_data) VALUES ('assets/aqua_07.jpg');
INSERT INTO image (image_data) VALUES ('assets/aqua_08.jpg');
INSERT INTO image (image_data) VALUES ('assets/aqua_09.jpg');
INSERT INTO image (image_data) VALUES ('assets/aqua_10.jpg');

-- Insérer les images pour l'habitat "Monts"
INSERT INTO image (image_data) VALUES ('assets/monts_01.jpg');
INSERT INTO image (image_data) VALUES ('assets/monts_02.jpg');
INSERT INTO image (image_data) VALUES ('assets/monts_03.jpg');
INSERT INTO image (image_data) VALUES ('assets/monts_04.jpg');
INSERT INTO image (image_data) VALUES ('assets/monts_05.jpg');
INSERT INTO image (image_data) VALUES ('assets/monts_06.jpg');
INSERT INTO image (image_data) VALUES ('assets/monts_07.jpg');
INSERT INTO image (image_data) VALUES ('assets/monts_08.jpg');
INSERT INTO image (image_data) VALUES ('assets/monts_09.jpg');
INSERT INTO image (image_data) VALUES ('assets/monts_10.jpg');


-- Table avis
CREATE TABLE IF NOT EXISTS avis (
    avis_id INT AUTO_INCREMENT,
    pseudo VARCHAR(50) NOT NULL,
    commentaire VARCHAR(255) NOT NULL,
    isVisible BOOL NOT NULL,
    PRIMARY KEY (avis_id)
);

-- Insérer des avis dans la table avis
INSERT INTO avis (pseudo, commentaire, isVisible) VALUES 
('Andréa T', 'Super expérience au zoo, les animaux étaient magnifiques !', TRUE),
("Goerge M", "J'ai adoré la diversité des habitats, mais il y avait trop de monde.", FALSE);


-- Table service
CREATE TABLE IF NOT EXISTS service (
    service_id INT AUTO_INCREMENT,
    nom VARCHAR(50) NOT NULL,
    description VARCHAR(255) NOT NULL,
    PRIMARY KEY (service_id)
);

-- Insérer des services dans la table service
INSERT INTO service (nom, description) VALUES 
('Restauration', 'Profitez de notre service de restauration avec des plats locaux et bio.'),
('Visite des habitats avec un guide', 'Découvrez les habitats des animaux avec un guide expérimenté. (Gratuit)'),
('Visite du zoo en petit train', 'Faites le tour du zoo en petit train et admirez les animaux.');
