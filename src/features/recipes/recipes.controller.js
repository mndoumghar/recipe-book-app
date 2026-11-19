import { getRecipes, searchRecipes, addRecipe, deleteRecipe } from "../../api/recipes.api.js";
import { renderRecipes, renderCounter } from "../../render/recipes.render.js";
import { renderPagination } from "../../render/pagination.render.js";
import { showLoading, showError, showSuccess, clearMessage } from "../../render/messages.render.js";
import { createRecipeForm } from "../../components/recipeForm.js";
import { debounce } from "../../utils/debounce.js";
import { throttle } from "../../utils/throttle.js";
import { computeTotalPages, computeSkip, clampPage } from "../../utils/pagination.js";
import { getErrorMessage } from "../../utils/errors.js";

const PAGE_SIZE = 12;
const SEARCH_DEBOUNCE_MS = 400;
const PAGINATION_THROTTLE_MS = 400;

export function initRecipesFeature(elements) {
  const {
    recipesContainer,
    counterEl,
    messageEl,
    searchInput,
    clearSearchButton,
    paginationContainer,
    addRecipeContainer,
  } = elements;

  const state = {
    query: "",
    page: 1,
    total: 0,
    recipes: [],
    pendingDeleteIds: new Set(),
  };

  let activeAbortController = null;

  async function loadRecipes() {
    if (activeAbortController) {
      activeAbortController.abort();
    }
    const controller = new AbortController();
    activeAbortController = controller;

    showLoading(messageEl);

    const skip = computeSkip(state.page, PAGE_SIZE);

    try {
      const data = state.query
        ? await searchRecipes(state.query, { limit: PAGE_SIZE, skip, signal: controller.signal })
        : await getRecipes({ limit: PAGE_SIZE, skip, signal: controller.signal });

      if (controller.signal.aborted) return;

      state.recipes = data.recipes ?? [];
      state.total = typeof data.total === "number" ? data.total : state.recipes.length;

      clearMessage(messageEl);
      renderView();
    } catch (error) {
      if (controller.signal.aborted) return;
      console.error(error);
      showError(messageEl, getErrorMessage(error), { onRetry: loadRecipes });
    } finally {
      if (activeAbortController === controller) {
        activeAbortController = null;
      }
    }
  }

  function renderView() {
    renderRecipes(recipesContainer, state.recipes, {
      onResetSearch: state.query ? resetSearch : null,
    });
    renderCounter(counterEl, {
      visible: state.recipes.length,
      total: state.total,
      isSearch: Boolean(state.query),
    });
    renderPaginationUI();
  }

  function renderPaginationUI() {
    const totalPages = computeTotalPages(state.total, PAGE_SIZE);
    state.page = clampPage(state.page, totalPages);

    renderPagination(paginationContainer, {
      page: state.page,
      totalPages,
      onPrevious: throttledPrevious,
      onNext: throttledNext,
    });
  }


  function goToPage(delta) {
    const totalPages = computeTotalPages(state.total, PAGE_SIZE);
    const nextPage = clampPage(state.page + delta, totalPages);
    if (nextPage === state.page) return;
    state.page = nextPage;
    loadRecipes();
  }

  const throttledPrevious = throttle(() => goToPage(-1), PAGINATION_THROTTLE_MS);
  const throttledNext = throttle(() => goToPage(1), PAGINATION_THROTTLE_MS);

  function resetSearch() {
    state.query = "";
    state.page = 1;
    searchInput.value = "";
    loadRecipes();
  }

  const debouncedSearch = debounce(() => {
    state.query = searchInput.value.trim();
    state.page = 1;
    loadRecipes();
  }, SEARCH_DEBOUNCE_MS);

  searchInput.addEventListener("input", debouncedSearch);
  clearSearchButton?.addEventListener("click", resetSearch);

  recipesContainer.addEventListener("click", (event) => {
    const button = event.target.closest('[data-action="delete-recipe"]');
    if (button) {
      handleDeleteRecipe(button);
    }
  });

  async function handleDeleteRecipe(button) {
    const card = button.closest("[data-recipe-id]");
    const recipeId = card?.dataset.recipeId;
    if (!recipeId || state.pendingDeleteIds.has(recipeId)) return;

    const recipeName = card.dataset.recipeName || "cette recette";
    const confirmed = window.confirm(
      `Supprimer « ${recipeName} » ? Cette suppression n'est pas conservée après un rechargement (limite de l'API DummyJSON).`
    );
    if (!confirmed) return;

    state.pendingDeleteIds.add(recipeId);
    button.disabled = true;
    const originalLabel = button.textContent;
    button.textContent = "Suppression...";

    try {
      await deleteRecipe(recipeId);

      state.recipes = state.recipes.filter((recipe) => String(recipe.id) !== String(recipeId));
      state.total = Math.max(0, state.total - 1);

      if (state.recipes.length === 0 && state.page > 1) {
        state.page -= 1;
        await loadRecipes();
      } else {
        renderView();
      }

      showSuccess(messageEl, "Recette supprimée pour cette session.");
    } catch (error) {
      console.error(error);
      showError(messageEl, getErrorMessage(error));
      button.disabled = false;
      button.textContent = originalLabel;
    } finally {
      state.pendingDeleteIds.delete(recipeId);
    }
  }

  async function handleAddRecipe(values) {
    const newRecipe = await addRecipe(values);

    state.recipes = [newRecipe, ...state.recipes].slice(0, PAGE_SIZE);
    state.total += 1;

    renderView();
  }

  if (addRecipeContainer) {
    addRecipeContainer.append(createRecipeForm({ onSubmit: handleAddRecipe }));
  }

  loadRecipes();
}
