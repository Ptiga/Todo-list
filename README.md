# TODO LIST


## Présentation du projet

Ce projet a pour but d'aider à vous organisant en vous proposant une Todo list pratique et simple d'utilisation.

**Sommaire**
* I - Installation du projet
* II - Création de la base de donnée
* III - Lancement du projet



## I \ Installation du projet


### 1) Téléchargement du projet

Les projet est téléchargeable sur Github : [LIEN_GIT]


### 2) Installation du projet

Décompressez le projet téléchargé dans le dossier de votre choix.


### 3) outils nécessaires

**Node JS**

Téléchargez Node à l'adresse suivante: https://nodejs.org/en/download/
Puis, installez-le.

Ouvrez ensuite votre invite de commande dans le dossier du projet* pour les étapes suivantes.

*2 manières de faire:
* 1-tapez 'cmd' dans la barre d'adresse du dossier contenant le projet
* 2-dans la barre de recherche de Windows tapez 'cmd' puis, dans l'invite de commande 'cd adresse_complete_vers_repertoire_projet\ 
    (si, par exemple, votre projet se trouve à l'adresse suivante: C:\MesDocuments\Outils\Todolist\ vous devrez taper dans l'invite de commande : 'cd C:\MesDocuments\Outils\Todolist\') 


**NPM**

dans l'invite de commande, tapez la commande suivante pour installer NPM: 
```jsx
npm install -g npm
```

En cas de besoin, voici le lien vers la doc npm : https://docs.npmjs.com/downloading-and-installing-node-js-and-npm


**Express**

Toujours dans l'invite de commande, tapez la commande: 
```jsx
npm install express --save
```

Lien vers la doc : https://expressjs.com/fr/starter/installing.html


/!\ conservez la fenêtre d'invite de commande ouverte, elle sera nécessaire pour lancer le serveur.




## II - Création de la base de donnée

Avant de pouvoir utiliser l'outil, il vous faudra créer une base de donnée avec MySQL. 


### 1 - Création de schémas

Créer un nouveau schémas que vous appelerez 'todolist' (il est possible de donner une nom différent mais une modification supplémentaire dans l'outil sera nécessaire)


### 2 - Création des tables

Executez la requête suivante pour créer les tables qui seront utilisées par l'outil : 
```jsx
Drop table if exists task;
Drop table if exists task_status;

CREATE TABLE task_status(
	id_status INT PRIMARY KEY,
	status_name VARCHAR(11) NOT NULL
);


CREATE TABLE task(
	id_task SERIAL PRIMARY KEY,
	task_name VARCHAR (50) NOT NULL,
	task_description TEXT,
	deadline DATE,
	task_status INT DEFAULT 1,
	completion_date DATE,
	FOREIGN KEY (task_status) REFERENCES task_status(id_status)
);
```


### 3 - Cration des statuts de tâches

lancez ensuite la requête suivante pour créer les statuts de tâches:
```jsx
INSERT INTO task_status(id_status, status_name ) VALUES (0, 'Achieved');
INSERT INTO task_status(id_status, status_name ) VALUES (1, 'In Progress');
INSERT INTO task_status(id_status, status_name ) VALUES (2, 'Cancelled');
```


### 4 - Problème entre MySQL et Node JS

Il est possible que des soucis de connection surviennent lorsque l'outil se connecte à une base de donnée MySQL. Pour éviter celà, lancez la requête suivante:
```jsx
ALTER USER '[USER]'@'[HOST]' IDENTIFIED WITH mysql_native_password BY "[PASSWORD]";
```

Remplacez les champs suivants :
[USER] par votre nom d'utilisateur (par défaut root)
[HOST] par l'adresse réseau (si utilisation en local mettre localhost)
[PASSWORD] par votre mot de passe d'accès


/!\ les simples quotes (') et doubles quotes (") sont à conserver !




## III - Lancement du projet


### 1 - Avant le lancement

Avant de lancer le projet, une dernière petite modification dans le code est nécessaire pour assurer son fonctionnement. Avec un éditeur de code ou de texte, ouvrez le fichier GestionBDD.js et modifiez, si besoin, les informations suivantes qui se trouvent sur les premières lignes :
```jsx
host: '[HOST]', (si différent de localhost)
user: '[USER], (si différent de root)
password: '[PASSWORD]' (votre mot de passe d'accès à la base de donnée)
database: 'Nom_du_schémas' (si différent de todolist).
```

Sauvegardez puis quittez, l'outil est enfin prêt à être lancé.


### 2 - Lancement

Dans la fenêtre d'invite de commande, saisissez : 
```jsx
node gestiontaches.js
```

Le serveur démarre et vous indique, en cas de succès, le message suivant : 'Todolist app listening on port 3000'

Dans votre navigateur préféré, saisissez l'adresse suivante : http://localhost:3000/

Vous êtes désormais sur l'interface de l'outil.


**Auteur**: Aurélien
**Version**: 0

