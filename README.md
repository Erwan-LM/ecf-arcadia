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
package.json: Fichier de configuration npm.
config.js: Fichier de configuration pour obtenir l'adresse IP locale.
babel.config.js: Configuration Babel pour le transpilage du code.
.env: Fichier de configuration des variables d'environnement.

**frontend**:

**components**:
AppNavigator.js: Navigateur principal de l'application.
BackgroundContainer.js: Conteneur pour l'arrière-plan.
Container.js: Conteneur principal.
Navigation.js: Composant de navigation.
**screens**:
Administrateur.js: Écran pour les fonctionnalités administrateur.
Aqua.js: Écran pour la zone Aqua.
Avis.js: Écran pour afficher les avis.
Connexion.js: Écran de connexion.
Contact.js: Écran de contact.
Employe.js: Écran pour les fonctionnalités employé.
Home.js: Écran d'accueil.
Montagne.js: Écran pour la zone Montagne.
Prairie.js: Écran pour la zone Prairie.
Savane.js: Écran pour la zone Savane.
Services.js: Écran pour afficher les services.
Tropic.js: Écran pour la zone Tropic.
Veterinaire.js: Écran pour les fonctionnalités vétérinaire.

**backend**:

**controllers**:
HomeController.js: Contrôleur principal.
administrateurController.js: Contrôleur pour les fonctionnalités administrateur.
avisController.js: Contrôleur pour les fonctionnalités d'avis.
contactController.js: Contrôleur pour les fonctionnalités de contact.
employesControloler.js: Contrôleur pour les fonctionnalités employé.
utilisateursController.js: Contrôleur pour les fonctionnalités utilisateur.
veterinaireController.js: Contrôleur pour les fonctionnalités vétérinaire.
**models**:
HomeModel.js: Modèle principal.
Administrateur.js: Modèle pour les administrateurs.
avisModel.js: Modèle pour les avis.
Contact.js: Modèle pour les contacts.
Services.js: Modèle pour les services.
Utilisateur.js: Modèle pour les utilisateurs.
Veterinaire.js: Modèle pour les vétérinaires.
**routes**:
HomeRoute.js: Route principale.
administrateursRoutes.js: Routes pour les fonctionnalités administrateur.
animauxRoutes.js: Routes pour les fonctionnalités d'animaux.
avisRoutes.js: Routes pour les fonctionnalités d'avis.
contactRoutes.js: Routes pour les fonctionnalités de contact.
employesRoutes.js: Routes pour les fonctionnalités employé.
servicesRoutes.js: Routes pour les fonctionnalités de services.
utilisateurs.js: Routes pour les fonctionnalités utilisateur.
veterinaireRoute.js: Routes pour les fonctionnalités vétérinaire.
**database**:
schema.sql: Schéma de la base de données.
database.js: Fichier de configuration de la base de données.

**assets**: *Répertoire contenant toutes les images au format .jpg ou .png.*  

## Technologies Utilisées   
**Frontend**:  

<u>React Native</u>:

Choix: React Native a été choisi pour le développement de l'application mobile car il permet de créer des applications natives pour Android et iOS à partir d'un codebase JavaScript commun.
Avantages:
Réutilisation du code: Avec React Native, nous pouvons réutiliser une grande partie du code entre les plateformes iOS et Android, ce qui réduit le temps de développement et les coûts.
Performances: Les applications React Native offrent généralement des performances similaires aux applications natives, car elles utilisent des composants natifs.
Grande communauté: React Native est largement adopté par la communauté des développeurs, ce qui signifie qu'il existe de nombreuses ressources disponibles pour résoudre les problèmes et améliorer les compétences.
  
<u>Expo</u>:

Choix: Expo a été choisi pour faciliter le développement et le déploiement rapide d'applications React Native.
Avantages:
Rapidité de développement: Expo offre un ensemble d'outils et de bibliothèques prêts à l'emploi qui accélèrent le processus de développement.
Déploiement simplifié: Expo simplifie le processus de déploiement en fournissant des outils pour générer des fichiers binaires prêts à être déployés sur les app stores.
Live Reload: La fonctionnalité Live Reload permet de voir instantanément les modifications apportées au code pendant le développement.
  
<u>React Navigation</u>:

Choix: React Navigation a été choisi pour gérer la navigation entre les différents écrans de l'application.
Avantages:
Facilité d'utilisation: React Navigation offre une API simple et intuitive pour gérer la navigation dans une application React Native.
Prise en charge de plusieurs types de navigation: React Navigation prend en charge différents types de navigation, tels que la navigation par onglets, la navigation par pile et la navigation par côte à côte.
Personnalisable: Il est facile de personnaliser l'apparence et le comportement de la navigation avec React Navigation.
  
<u>Axios</u>:

Choix: Axios a été choisi comme client HTTP pour effectuer des requêtes réseau dans l'application.
Avantages:
Facilité d'utilisation: Axios offre une syntaxe simple et intuitive pour effectuer des requêtes HTTP.
Prise en charge des intercepteurs: Axios permet d'intercepter et de modifier les requêtes et les réponses, ce qui est utile pour ajouter des en-têtes d'autorisation ou gérer les erreurs de manière centralisée.
  
<u>React Native Gesture Handler, React Native Reanimated, React Native Safe Area Context, React Native Screens, React Native Swiper, React Native Vector Icons</u>:

Choix: Ces bibliothèques ont été choisies pour améliorer l'expérience utilisateur et fournir des fonctionnalités supplémentaires telles que les gestes, les animations et les icônes personnalisées.
Avantages:
Amélioration de l'expérience utilisateur: Ces bibliothèques permettent d'ajouter des fonctionnalités avancées telles que les gestes tactiles, les transitions d'écran fluides et les animations attrayantes.
Compatibilité: Ces bibliothèques sont compatibles avec React Native et sont largement utilisées par la communauté, ce qui garantit une bonne qualité et une stabilité élevée.

**Backend**:  

<u>Node.js</u>:

Choix: Node.js a été choisi comme environnement d'exécution côté serveur pour le backend de l'application.
Avantages:
JavaScript côté serveur: Avec Node.js, nous pouvons utiliser JavaScript à la fois côté client et côté serveur, ce qui permet une cohérence de la logique et des modèles de programmation.
Évolutivité: Node.js est connu pour sa capacité à gérer de grandes charges de travail avec une faible utilisation des ressources système, ce qui le rend adapté aux applications à forte charge.
  
<u>Express.js</u>:

Choix: Express.js a été choisi comme framework Web pour construire l'API RESTful du backend.
Avantages:
Minimalisme: Express.js est un framework léger qui offre un ensemble minimal de fonctionnalités, ce qui le rend facile à apprendre et à utiliser.
Middleware: Express.js offre un système de middleware flexible qui permet de gérer facilement les requêtes HTTP, d'effectuer des validations et d'ajouter des fonctionnalités supplémentaires à l'application.
  
<u>MySQL</u>:

Choix: MySQL a été choisi comme système de gestion de base de données relationnelle pour stocker les données de l'application.
Avantages:
Fiabilité: MySQL est un système de gestion de base de données bien établi et largement utilisé, connu pour sa fiabilité et sa stabilité.
Performance: MySQL offre des performances élevées pour les opérations de lecture et d'écriture, ce qui en fait un choix populaire pour les applications nécessitant une grande disponibilité et une scalabilité.
En choisissant ces technologies, nous visons à fournir une expérience utilisateur fluide et performante tout en garantissant une architecture backend robuste et évolutive.


**Conclusion**

Ce **README** fournit un aperçu de l'application Web Arcadia Zoo,  
y compris les histoires d'utilisateurs,  
la structure du projet et les technologies utilisées.  
Pour plus d'informations sur des fichiers ou des composants spécifiques, n'hésitez pas à demander !

**Remarques**
Ce projet est encore en cours de développement. En raison de contraintes de temps, certaines fonctionnalités n'ont pas encore été finalisées ou peuvent présenter des bugs. Les problèmes connus sont les suivants :

Les images ne s'affichent pas correctement.
La récupération d'adresse IP peut être instable dans certaines circonstances.
N'hésitez pas à proposer des alternatives ou des solutions pour résoudre ces problèmes si vous les rencontrez. Tous les conseils sont les bienvenus !

**Sécurité**
Ce projet a mis en place plusieurs mesures de sécurité pour protéger les données sensibles, y compris :

Utilisation de bcrypt pour le hachage sécurisé des mots de passe.
Limitation des accès aux données sensibles via des contrôles d'accès et des autorisations appropriées.
Mise en œuvre de pratiques de sécurisation des API, telles que la validation des entrées et la protection contre les attaques par injection SQL.

**Outils Utilisés**
VS Code : Environnement de développement principal pour l'écriture de code et la gestion de versions avec Git.
Git Bash : Utilisé pour les opérations Git en ligne de commande.
Android Studio : Utilisé pour le développement et le test d'applications Android.
MySQL Workbench : Utilisé pour la gestion et l'administration de la base de données MySQL.
Trello : Utilisé comme outil de gestion de projet pour la planification des tâches, le suivi du travail et la collaboration avec l'équipe.  Voici le lien Trello : https://trello.com/b/kk8b9ItP/ecf-2024 
 https://trello.com/invite/b/kk8b9ItP/ATTI8ca373acb400c52ca53e10d1a135af6cE3AFF7A1/ecf-2024

N'hésitez pas à me demander d'autres informations ou des clarifications supplémentaires si nécessaire !
