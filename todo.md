 
## 2. US-01 — Voir les recettes

**En tant que membre du club, je veux consulter les recettes afin de choisir celle de l'atelier.**

### Tâches
- [X] Créer la fonction API qui appelle `GET /recipes` avec le paramètre `limit=12`.
- [X] Lire les recettes depuis la propriété `recipes` de la réponse.
- [X] Afficher un indicateur de chargement pendant la requête.
- [X] Créer une carte par recette avec : photo, nom, cuisine, difficulté et temps de préparation.
- [X] Afficher le nombre de recettes actuellement visibles.
- [X] Prévoir une image de remplacement si une recette ne possède pas d'image exploitable.
- [X] Afficher un message d'erreur clair si le chargement échoue.
- [X] Ajouter un bouton « Réessayer » après une erreur de chargement.

### Critères de validation
- [X] Au chargement initial, l'application demande 12 recettes.
- [X] Les cartes sont construites à partir des données reçues, pas de données écrites en dur.
- [X] Le compteur correspond au nombre de cartes visibles.
- [X] La page ne se recharge pas pendant l'opération.

## 3. US-02 — Chercher une recette

**En tant que membre du club, je veux rechercher une recette par mot-clé.**

### Tâches
- [X] Ajouter un champ de recherche et un bouton de recherche.
- [X] Créer la fonction API qui appelle `GET /recipes/search` avec `q` comme paramètre.
- [X] Envoyer le mot-clé avec la configuration `params` d'Axios.
- [X] Afficher les résultats reçus en réutilisant le composant/la fonction de rendu des cartes.
- [X] Mettre à jour le compteur selon les résultats affichés.
- [X] Afficher exactement « Aucune recette trouvée » si la recherche ne retourne aucun résultat.
- [X] Afficher un bouton « Revoir toutes les recettes » dans l'état vide.
- [X] Faire en sorte que ce bouton relance la liste initiale (`GET /recipes?limit=12`).
- [X] Gérer le chargement et les erreurs pendant une recherche.

### Critères de validation
- [X] La recherche utilise `GET /recipes/search?q=...`.
- [X] Le mot-clé n'est pas concaténé manuellement dans une URL non encodée.
- [X] Une recherche vide ne déclenche pas une recherche inutile.
- [X] Le retour à la liste complète fonctionne sans rechargement.

## 4. US-03 — Ajouter une recette

**En tant que membre du club, je veux proposer une recette au carnet.**

### Tâches — formulaire et validation
- [X] Créer les champs : nom, cuisine, difficulté et temps de préparation.
- [X] Valider le nom : obligatoire, entre 3 et 60 caractères.
- [X] Valider la cuisine : obligatoire.
- [x] Valider la difficulté : obligatoire et limitée aux valeurs proposées par l'interface/API (par exemple `Easy`, `Medium`, `Hard`).
- [X] Valider le temps : nombre entier compris entre 1 et 300 minutes.
- [x] Afficher un message sous chaque champ invalide.
- [X] Retirer ou actualiser le message d'erreur lorsque le champ devient valide.
- [X] Bloquer la soumission et ne déclencher aucun POST tant qu'une erreur existe.

### Tâches — envoi et affichage
- [X] Créer la fonction API qui appelle `POST /recipes/add`.
- [X] Envoyer un objet JSON avec les champs validés : `name`, `cuisine`, `difficulty` et `prepTimeMinutes`.
- [X] Désactiver le bouton pendant l'envoi afin d'éviter les doubles soumissions.
- [X] Utiliser la recette retournée par le serveur pour créer la nouvelle carte.
- [X] Insérer cette carte en première position sans recharger la page.
- [X] Prévoir une image de remplacement si la réponse POST ne fournit pas de champ `image`.
- [X] Afficher un message de succès en français.
- [X] Réinitialiser le formulaire après une création réussie.
- [X] Réactiver le bouton après la fin de la requête, succès ou erreur.

### Critères de validation
- [X] Aucun POST ne part si un champ est invalide.
- [X] Le POST passe par l'instance Axios unique et envoie un objet JSON.
- [x] La carte affichée provient de la réponse du serveur, et non d'un objet local inventé.
- [x] La nouvelle recette apparaît en première position.

## 5. US-04 — Supprimer une recette

**En tant que membre du club, je veux retirer une recette du carnet.**

### Tâches
- [ ] Ajouter un bouton « Supprimer » sur chaque carte.
- [ ] Demander une confirmation avant d'envoyer la requête.
- [ ] Si l'utilisateur annule, ne faire aucun appel DELETE.
- [ ] Créer la fonction API qui appelle `DELETE /recipes/{id}` avec l'identifiant de la recette.
- [ ] Attendre la réponse du serveur avant de retirer la carte de l'interface.
- [ ] Après succès, retirer uniquement la carte correspondant à l'identifiant supprimé.
- [ ] Mettre à jour le compteur.
- [ ] Afficher un message de confirmation.
- [ ] En cas d'erreur, conserver la carte et afficher un message explicite avec une possibilité de réessayer.

### Critères de validation
- [ ] L'URL DELETE contient l'identifiant de la recette choisie.
- [ ] La confirmation précède la requête.
- [ ] La carte n'est retirée qu'après une réponse réussie.

## 6. US-05 — Comprendre le chargement et les erreurs

**En tant que membre du club, je veux comprendre ce que fait l'application lorsqu'elle charge ou rencontre un problème.**

### Tâches
- [ ] Définir un état de chargement visible pour les opérations réseau.
- [ ] Distinguer une erreur sans réponse du serveur (serveur injoignable / problème réseau).
- [ ] Afficher un message spécifique pour le statut HTTP `404` : recette introuvable.
- [ ] Afficher un message spécifique pour le statut HTTP `500` : erreur du serveur.
- [ ] Prévoir un message générique pour les autres erreurs HTTP.
- [ ] Ajouter un bouton « Réessayer » pour les opérations qui peuvent être relancées.
- [ ] Empêcher les doubles clics pendant une opération en cours.
- [ ] Vérifier que les états de chargement sont toujours retirés après succès ou échec.

### Critères de validation
- [ ] Les messages sont compréhensibles et rédigés en français.
- [ ] Le chargement ne reste pas bloqué après une erreur.
- [ ] Le bouton Réessayer relance l'opération appropriée.

## 7. Qualité, tests et vérifications

- [ ] Tester le chargement initial : 12 cartes et compteur correct.
- [ ] Tester une recherche qui retourne des résultats.
- [ ] Tester une recherche sans résultat et le bouton de retour à la liste.
- [ ] Tester le formulaire vide : aucun POST.
- [ ] Tester un nom de 2 caractères : aucun POST.
- [ ] Tester un nom de 3 caractères puis un nom de 60 caractères : validation acceptée.
- [ ] Tester un nom de plus de 60 caractères : aucun POST.
- [ ] Tester un temps de 0 et de 301 minutes : aucun POST.
- [ ] Tester un temps de 1 et de 300 minutes : validation acceptée.
- [ ] Tester l'ajout valide et vérifier dans Network le POST, son payload et sa réponse.
- [ ] Vérifier que la carte ajoutée est construite à partir de la réponse POST.
- [ ] Tester l'annulation de suppression : aucun DELETE.
- [ ] Tester une suppression confirmée et vérifier l'URL DELETE et la réponse dans Network.
- [ ] Tester une erreur réseau en mettant le navigateur hors ligne.
- [ ] Tester le cas `404` avec une ressource/route inexistante lorsque l'API le permet.
- [ ] Prévoir une manière contrôlée de vérifier le message `500` ; ne pas supposer que DummyJSON renverra spontanément ce statut.
- [ ] Vérifier qu'aucun appel `fetch()` n'existe dans le projet.
- [ ] Vérifier que tous les appels HTTP utilisent l'unique instance Axios.
- [ ] Vérifier le comportement sur une largeur mobile et une largeur desktop.
- [ ] Vérifier qu'aucune action ne recharge la page.

## 8. README et livrables

- [ ] Expliquer le but du projet et les fonctionnalités.
- [ ] Expliquer le rôle de chaque fichier.
- [ ] Ajouter un tableau des requêtes : méthode, URL, données envoyées et forme de la réponse.
- [ ] Documenter la configuration de l'instance Axios (`baseURL` et `timeout`).
- [ ] Documenter les règles de validation du formulaire.
- [ ] Documenter la gestion des erreurs réseau et HTTP.
- [ ] Expliquer la limite de DummyJSON : les ajouts et suppressions sont simulés et ne sont pas persistants.
- [ ] Ajouter une capture de l'état de chargement.
- [ ] Ajouter une capture de la liste des recettes.
- [ ] Ajouter une capture d'un état d'erreur.
- [ ] Ajouter une capture de l'état sans résultat.
- [ ] Ajouter les scénarios de test manuels et leurs résultats.
- [ ] Ajouter le lien du dépôt GitHub.
- [ ] Ajouter le lien GitHub Pages.
- [ ] Ajouter le lien du Kanban mis à jour.

## 9. Déploiement et préparation de la présentation

- [ ] Vérifier que les chemins des fichiers et des ressources fonctionnent sur GitHub Pages.
- [ ] Déployer l'application sur GitHub Pages.
- [ ] Tester toutes les fonctionnalités sur l'URL publiée, pas uniquement en local.
- [ ] Préparer une démonstration de 5 minutes : rechercher, ajouter, supprimer avec l'onglet Network visible.
- [ ] Préparer une explication de 5 minutes : instance Axios, validation, séparation des fichiers et gestion des erreurs.
- [ ] Préparer 5 minutes de questions-réponses : REST API, Axios, GET/POST/DELETE, timeout, statuts HTTP et limites de DummyJSON.

## 10. Répartition de travail suggérée

| Séance | Objectif principal | Résultat attendu |
|---|---|---|
| 16/11 | Analyse, structure, interface statique et instance Axios | Projet initialisé et responsabilités définies |
| 17/11 | US-01 et US-02 | Liste, cartes, compteur et recherche fonctionnels |
| 18/11 | US-03 | Validation et ajout fonctionnels |
| 19/11 | US-04 et US-05 | Suppression, chargement et erreurs fonctionnels |
| 20/11 | Tests, README, GitHub Pages et présentation | Livrables vérifiés et démonstration prête |

## Références techniques

- DummyJSON Recipes : https://dummyjson.com/docs/recipes
- Axios — Creating an instance : https://axios-http.com/docs/instance
- Axios — Request Config : https://axios-http.com/docs/req_config
- MDN — HTTP request methods : https://developer.mozilla.org/docs/Web/HTTP/Methods

## Point à clarifier dans le brief

Le brief indique une période de travail du **16/11/2026 au 20/11/2026**, mais aussi une date limite de rendu au **13/11/2026 à 23:59**. Cette date de rendu précède le début de la période de travail. Faire confirmer la bonne date de livraison auprès du formateur.
