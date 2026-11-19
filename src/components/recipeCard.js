export const PLACEHOLDER_IMAGE = "/images/recipe-placeholder.svg";

/**
 * Builds one recipe card. Pure DOM construction — no API calls, no
 * business logic beyond reading the recipe object it's given.
 */
export function createRecipeCard(recipe) {
  const card = document.createElement("article");
  card.dataset.recipeId = String(recipe.id ?? "");
  card.dataset.recipeName = recipe.name ?? "";

  card.className = [
    "grid grid-cols-1 overflow-hidden rounded-2xl border border-ink/10 bg-page text-ink shadow-sm",
    "transition-all duration-300 hover:border-accent hover:shadow-lg",
    "md:grid-cols-[1.618fr_1fr]",
  ].join(" ");

  card.append(createImage(recipe), createDetails(recipe));

  return card;
}

function createImage(recipe) {
  const image = document.createElement("img");
  image.src = recipe.image || PLACEHOLDER_IMAGE;
  image.alt = recipe.name ? `Photo de la recette ${recipe.name}` : "Recette sans photo";
  image.loading = "lazy";
  image.decoding = "async";
  image.className = "h-64 w-full object-cover md:h-full md:min-h-[320px]";

  // Broken/unreachable image URL -> fall back to the local placeholder.
  image.addEventListener(
    "error",
    () => {
      image.src = PLACEHOLDER_IMAGE;
    },
    { once: true }
  );

  return image;
}

function createDetails(recipe) {
  const details = document.createElement("div");
  details.className = "flex flex-col justify-center gap-4 p-5 md:p-8";

  const title = document.createElement("h2");
  title.textContent = recipe.name ?? "Recette sans nom";
  title.className = "text-2xl font-bold leading-tight tracking-tight text-ink md:text-3xl";

  const meta = document.createElement("div");
  meta.className = "flex flex-wrap gap-2";
  meta.append(
    createBadge(`Cuisine : ${recipe.cuisine ?? "-"}`),
    createBadge(`Difficulté : ${recipe.difficulty ?? "-"}`),
    createBadge(`Préparation : ${recipe.prepTimeMinutes ?? "-"} min`)
  );

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.dataset.action = "delete-recipe";
  deleteButton.textContent = "Supprimer";
  deleteButton.setAttribute("aria-label", `Supprimer la recette ${recipe.name ?? ""}`);
  deleteButton.className = [
    "mt-2 self-start rounded-lg border border-red-700/30 px-4 py-2 text-sm font-medium text-red-700",
    "transition-colors hover:bg-red-700 hover:text-page focus:outline-none focus:ring-2 focus:ring-red-700/40",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ].join(" ");

  details.append(title, meta, deleteButton);
  return details;
}

function createBadge(text) {
  const badge = document.createElement("p");
  badge.textContent = text;
  badge.className = "rounded-full bg-accent/10 px-3 py-2 text-sm font-medium text-accent";
  return badge;
}
