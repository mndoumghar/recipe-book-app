import "./styles/input.css";
import { initRecipesFeature } from "./features/recipes/recipes.controller.js";

document.addEventListener("DOMContentLoaded", () => {
  initRecipesFeature({
    recipesContainer: document.querySelector("#recipes-container"),
    counterEl: document.querySelector("#recipes-counter"),
    messageEl: document.querySelector("#message"),
    searchInput: document.querySelector("#search-input"),
    clearSearchButton: document.querySelector("#clear-search-button"),
    paginationContainer: document.querySelector("#pagination-container"),
    addRecipeContainer: document.querySelector("#add-recipe-container"),
  });
});
