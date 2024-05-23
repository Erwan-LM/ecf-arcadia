# Arcadia Zoo - Application Web & Mobile

## Aperçu

L'application Arcadia Zoo permet aux visiteurs de visualiser les différents habitats, services et horaires du zoo. Elle offre également la possibilité aux vétérinaires, aux employés et aux administrateurs d'accéder à des fonctionnalités spécifiques telles que la gestion des animaux, des services et des avis des visiteurs.

## Instructions d'Installation

1. **Cloner le dépôt sur votre machine locale :**

   ```bash
   git clone <(https://github.com/Erwan-LM/ecf-arcadia.git)>


## Accéder au répertoire du projet :

 ```bash
cd zoo
```
## Installer les dépendances :

 ```bash
npm install
```
## Lancer le serveur de développement :

 ```bash
node server.js
```
Assurer le fonctionnement du serveur backend sur le port 3000.

## Lancer l'application :

 ```bash
npm start
```
Accéder à l'application via Expo sur votre appareil mobile ou votre émulateur.

## Accès à la base de données :
La base de données est gérée localement par défaut.  
Si vous souhaitez accéder à la base de données à distance ou la déployer sur un serveur distant,  
vous devrez modifier les paramètres de connexion dans le fichier server.js pour correspondre à votre configuration.

De plus, vous pouvez importer le schéma de la base de données en exécutant le script SQL schema.sql.  
Assurez-vous d'avoir une base de données MySQL installée localement ou accessible à distance.  
Vous pouvez utiliser un outil tel que MySQL Workbench pour importer le schéma et gérer votre base de données. 

## Structure du Projet
App.js: Point d'entrée de l'application.  
server.js: Fichier principal du serveur backend.  
**frontend**:  
components:  
AppNavigator.js: *Navigateur principal de l'application.*  
BackgroundContainer.js: *Conteneur pour l'arrière-plan.*  
Container.js: *Conteneur principal.*  
Navigation.js: *Composant de navigation.*  
screens:  
Aqua.js: *Écran pour la zone Aqua.*  
Connexion.js: *Écran de connexion.*  
Contact.js: *Écran de contact.*  
Home.js: *Écran d'accueil.*  
Monts.js: *Écran pour la zone Monts.*  
Prairie.js: *Écran pour la zone Prairie.*  
Savane.js: *Écran pour la zone Savane.*  
Services.js: *Écran pour les services.*  
Tropic.js: *Écran pour la zone Tropic.*  
**backend**:  
controllers:  
HomeController.js: *Contrôleur principal.*  
models:  
HomeModel.js: *Modèle principal.*  
routes:  
HomeRoute.js: *Route principale.*  
**database**:  
schema.sql: *Schéma de la base de données.*  
**assets**: *Répertoire contenant toutes les images au format .jpg ou .png.*  

## Technologies Utilisées   
**Frontend**:  

React Native  
Expo  
React Navigation  
Axios  
React Native Gesture Handler  
React Native Reanimated  
React Native Safe Area Context  
React Native Screens  
React Native Swiper  
React Native Vector Icons  

**Backend**:  

Node.js  
Express.js  
MySQL  
Conclusion  

Ce **README** fournit un aperçu de l'application Web Arcadia Zoo,  
y compris les histoires d'utilisateurs,  
la structure du projet et les technologies utilisées.  
Pour plus d'informations sur des fichiers ou des composants spécifiques, n'hésitez pas à demander !
