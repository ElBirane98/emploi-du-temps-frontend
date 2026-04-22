# Rapport De Presentation Du Projet

## 1. Identification Du Projet
- **Nom** : SamaPlan / Emploi du temps FrontEnd
- **Type** : Application web de gestion et de consultation des emplois du temps universitaires
- **Cadre** : Projet Angular (SPA) avec interfaces Admin et Visiteur
- **Date du rapport** : 22 avril 2026

## 2. Contexte Et Problematique
La planification des seances pedagogiques implique plusieurs contraintes : disponibilite des enseignants, occupation des salles, repartition des cours par classe et detection des conflits.  
Ce projet propose une interface unique pour visualiser, organiser et suivre les emplois du temps afin de reduire les erreurs de planification et d'ameliorer la coordination.

## 3. Objectifs Du Projet
- Centraliser la gestion des emplois du temps.
- Offrir une consultation publique (mode visiteur) sans connexion.
- Fournir un espace administrateur pour la creation, la modification et le suivi des seances.
- Faciliter l'exploitation des donnees (filtres, vues par entite, exports).

## 4. Perimetre Fonctionnel
### 4.1 Espace Visiteur
- Consultation de la grille hebdomadaire.
- Filtres par classe, enseignant et cours.
- Affichage detaille des seances.

### 4.2 Espace Administrateur
- Tableau de bord (indicateurs et activites).
- Gestion des seances (liste, grille, formulaire de creation/modification).
- Gestion des cours, enseignants, salles, classes, departements et filieres.
- Navigation laterale structuree par modules.

## 5. Architecture Et Organisation Technique
- **Framework** : Angular 21 (standalone components, lazy loading des routes).
- **UI** : Bootstrap 5 + Bootstrap Icons + styles personnalises.
- **Etat des donnees** : services Angular avec jeux de donnees mock (`of(...)`) pour les entites principales.
- **Modules metier** :
  - `core/services` : seances, cours, enseignants, salles, authentification.
  - `features/admin` : ecrans de gestion.
  - `features/visiteur` : consultation de la grille EDT.
  - `shared/composants` : layouts communs.

## 6. Technologies Et Outils
- **Langages** : TypeScript, HTML, CSS
- **Runtime / tooling** : Node.js, npm
- **Scripts npm** :
  - `npm start` : demarrage local
  - `npm run build` : build de production
  - `npm test` : tests
- **Tests** : environnement Angular/Vitest configure dans le projet.

## 7. Etat Actuel Du Projet
- L'application compile correctement (`npm run build` valide).
- Les deux parcours (Admin et Visiteur) sont disponibles.
- Les donnees sont principalement simulees cote front (mode mock), en attente d'integration complete avec l'API backend.
- Le projet contient une base UI solide et coherent, deja exploitable pour demonstration fonctionnelle.

## 8. Contraintes Et Limites Observees
- Budget de bundle initial depasse (avertissement Angular a l'etape build).
- Authentification encore orientee demonstration sur certaines parties.
- Quelques interactions frontend peuvent etre encore industrialisees (gestion d'etat, validations metier avancees, hardening securite).

## 9. Perspectives D'Amelioration
1. Finaliser l'integration backend reelle sur l'ensemble des CRUD.
2. Renforcer les regles de validation et de detection automatique de conflits.
3. Ajouter des tests fonctionnels et de non regression plus complets.
4. Optimiser les performances front (taille bundle, chargement, cache).
5. Mettre en place une gestion des roles/profils plus fine et des journaux d'activite.

## 10. Conclusion
Le projet SamaPlan repond au besoin principal de gestion et de consultation des emplois du temps dans un contexte universitaire.  
Il presente une architecture claire, une separation fonctionnelle nette entre administration et consultation, et une base technique moderne sous Angular.  
La prochaine phase consiste a consolider l'integration API, la robustesse metier et l'optimisation globale pour un passage en environnement de production.

