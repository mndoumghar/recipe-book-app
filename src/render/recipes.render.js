import { createRecipeCard } from "../components/recipeCard.js";
import { EMPTY_RESULTS_MESSAGE } from "./messages.render.js";

export function renderRecipes(container, recipes, { onResetSearch } = {}) {
  container.replaceChildren();

  if (!recipes || recipes.length === 0) {
    container.append(createEmptyState(onResetSearch));
    return;
  }

  const fragment = document.createDocumentFragment();
  recipes.forEach((recipe) => fragment.append(createRecipeCard(recipe)));
  container.append(fragment);
}

function createEmptyState(onResetSearch) {
  const wrapper = document.createElement("div");
  wrapper.className = "col-span-full flex flex-col items-center gap-4 py-12 text-center text-ink";

  const text = document.createElement("p");
  text.textContent = EMPTY_RESULTS_MESSAGE;
  text.className = "text-lg font-medium";
  wrapper.append(text);

  if (onResetSearch) {
    const resetButton = document.createElement("button");
    resetButton.type = "button";
    resetButton.textContent = "Revoir toutes les recettes";
    resetButton.className =
      "rounded-lg bg-accent px-4 py-2 font-medium text-page transition-colors hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent/40";
    resetButton.addEventListener("click", onResetSearch);
    wrapper.append(resetButton);
  }

  return wrapper;
}

export function renderCounter(container, { visible, total, isSearch }) {
  container.replaceChildren();
  container.setAttribute("role", "status");
  container.setAttribute("aria-live", "polite");
  container.className = "text-sm font-medium text-ink/80";
  container.textContent = isSearch
    ? `${total} recette(s) trouvée(s)`
    : `${visible} recette(s) affichée(s) sur ${total}`;
}

