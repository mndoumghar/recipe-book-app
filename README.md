# Carnet de recettes (Recipe Book App)

Petit projet d'apprentissage : un carnet de recettes qui consomme l'API
publique [DummyJSON Recipes](https://dummyjson.com/docs/recipes) pour
afficher, rechercher, ajouter et supprimer des recettes.
## Fonctionnalités


- **US-01 — Voir les recettes** : chargement de 12 recettes (photo, nom,
  cuisine, difficulté, temps de préparation), compteur de résultats, image
  de remplacement si la photo est manquante ou cassée.
- **US-02 — Chercher une recette** : recherche par mot-clé (debounce de
  400 ms), compteur mis à jour, message exact `Aucune recette trouvée` et
  bouton `Revoir toutes les recettes` dans l'état vide.
- **US-03 — Ajouter une recette** : formulaire validé (nom, cuisine,
  difficulté, temps de préparation), envoi `POST /recipes/add`, la carte
  affichée provient de la réponse du serveur.
- **US-04 — Supprimer une recette** : bouton de suppression par carte,
  confirmation obligatoire, envoi `DELETE /recipes/{id}`, la carte n'est
  retirée qu'après une réponse réussie.
- **US-05 — Chargement et erreurs** : états de chargement, messages
  d'erreur en français (réseau, 404, 500, erreur générique), bouton
  Réessayer, protection contre les doubles soumissions/suppressions et les
  réponses obsolètes (requêtes annulées via `AbortController`).
- **Pagination** côté serveur (`limit`/`skip`) pour la liste complète et la
  recherche, avec conservation du mot-clé actif entre les pages.
cune action ne recharge la page (vérifier l'absence de rechargement
      dans Network en filtrant par "Doc").

## Déploiement

Aucune configuration de déploiement (GitHub Pages, URL de dépôt) n'était
présente dans le projet d'origine. **TODO** : si vous déployez sur GitHub
Pages, ajoutez `base: "/<nom-du-repo>/"` dans `vite.config.js` et indiquez
ici l'URL du dépôt et l'URL publiée.
