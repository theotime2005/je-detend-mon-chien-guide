# Je détend mon chien Guide

## Présentation
Le but de cette plateforme est d'organiser des détentes pour les chiens guide d'aveugle et leur maître. Une détente est un moment où le chien guide est en liberté et peut se défouler, se comporter comme un chien. Il est nécessaire dans la vie d'un chien guide et très important.
Durant ce moment de détente, il est agréable pour le maître d'être accompagné par une personne voyante, voir de faire la détente en groupe, permettant ainsi au chien guide d'être avec des camarades de jeu et de plus se dépenser.

## Fonctionnalités à mettre en place avant le déploiement
- Avoir un système d'authentification complet avec réinitialisation du mot de passe, activation du compte par email,
- Pouvoir (si on est maître de chien guide) ajouter animal à son compte,
- Pouvoir soit organiser une détente, soit demander à organiser une détente.
Dans un premier temps, un champ description contiendra toutes les informations sur la détentes, ce champ sera divisé plus tard avec par exemple, le lieu, et la durée. Les informations qui devront être séparées dès le début seront l'heure de la détente.

## Convention de code
Cette plateforme est française et a vocation à le rester. Cependant le code doit être écrit en anglais tout comme les commits, les pull requests et les commentaires dans le code. Le texte quant-à lui doit être écrit en français, il n'y a pas de système d'internationalisation prévu pour le moment.
Les titres des pull requests doivent respecter la convention feat, fix, docs, refactor, tech, suivi de ':' et du titre de la PR. Un scope (api), (web), (app) peut être inclu après le sigle de la PR.

## Contribuer
Vous devez disposer de docker et node-js pour pouvoir utiliser ce projet.
### Cloner le dépôt
```bash
git clone git@github.com:theotime2005/je-detend-mon-chien-guide.git
```

### Installation
Un script de configuration est disponible pour les systèmes unix. Pour le lancer, placez-vous dans le terminal dans le dossier racine du projet et tapez:
```bash
npm run configure
```
Vous devez avoir au préalable lancer docker.

### Lancement du projet
Vous pouvez tout lancer avec:
```bash
npm run dev
```
Vous pouvez également lancer les éléments séparément en vous plaçant dans les dossier ou en rajoutant :api à la fin de la commande dans le dossier racine, par exemple:
```bash
npm run dev:api 
```

### Reset de la base
Pour réinitialiser la base de donnée, vous pouvez faire:
```bash
npm run db:reset
```
dans le dossier api. Des seeds (données déjà préparées) sont disponible et augmenteront au fur et à mesure du projet.

### Linter
Un linter est présent pour vérifier qu'une syntaxe logique dans tout le code est appliquée.
