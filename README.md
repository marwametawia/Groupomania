#Groupomania

Créez un réseau social d’entreprise

Scénario
Vous êtes développeur depuis plus d'un an chez CONNECT-E, une petite agence web regroupant une douzaine d'employés.
Votre directrice, Stéphanie, invite toute l'agence à prendre un verre pour célébrer une bonne nouvelle ! Elle vient de signer un contrat pour un nouveau projet ambitieux ! 🥂
Le client en question est Groupomania, un groupe spécialisé dans la grande distribution et l'un des plus fidèles clients de l'agence.
Le projet consiste à construire un réseau social interne pour les employés de Groupomania. Le but de cet outil est de faciliter les interactions entre collègues.
Le département RH de Groupomania a laissé libre cours à son imagination pour les fonctionnalités du réseau et a imaginé plusieurs briques pour favoriser les échanges entre collègues.

Outils necessaires: Docker (en téléchargement ici: https://www.docker.com/products/docker-desktop)

## Installer le projet 
Clonnez le github
##Pour le backend:
Télécharger docker desktop et créer un compte
Dans le terminal écrire:
docker pull postgres
puis

docker run --name postgresql_dev -e POSTGRES_PASSWORD=toto -d -p 5432:5432  postgres


ensuite se rendre dans la racine du projet:
Puis écrire dans le terminal
cd backend
```
npm install
```
puis lancez le server :
 ```
nodemon server
```

## Pour le frontend:
cd frontend
Puis 

```
npm install
```
puis lancez le server :
 ```
npm run dev
```




