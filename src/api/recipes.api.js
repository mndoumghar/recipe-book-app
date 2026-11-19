import axiosClient from "./axiosClient.js";

/**
 * GET /recipes — paginated list of recipes.
 * @returns {Promise<{recipes: object[], total: number, skip: number, limit: number}>}
 */
export async function getRecipes({ limit = 12, skip = 0, signal } = {}) {
  const response = await axiosClient.get("/recipes", {
    params: { limit, skip },
    signal,
  });
  return response.data;
}

/**
 * GET /recipes/search — paginated keyword search.
 * @returns {Promise<{recipes: object[], total: number, skip: number, limit: number}>}
 */
export async function searchRecipes(query, { limit = 12, skip = 0, signal } = {}) {
  const response = await axiosClient.get("/recipes/search", {
    params: { q: query, limit, skip },
    signal,
  });
  return response.data;
}

/**
 * POST /recipes/add — DummyJSON simulates the write; it returns a recipe
 * object (with a generated id) but does not persist it server-side.
 */
export async function addRecipe(recipe, { signal } = {}) {
  const response = await axiosClient.post("/recipes/add", recipe, { signal });
  return response.data;
}

/**
 * DELETE /recipes/{id} — DummyJSON simulates the write; it returns the
 * deleted recipe but the data is restored on the next reload.
 */
export async function deleteRecipe(id, { signal } = {}) {
  const response = await axiosClient.delete(`/recipes/${id}`, { signal });
  return response.data;
}
