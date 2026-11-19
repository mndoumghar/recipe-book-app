export const EMPTY_RESULTS_MESSAGE = "Aucune recette trouvée";

export function showLoading(container, text = "Chargement des recettes...") {
  container.replaceChildren();
  container.dataset.state = "loading";
  container.className = "text-center text-sm font-medium text-ink/70";
  container.textContent = text;
}

export function showError(container, message, { onRetry } = {}) {
  container.replaceChildren();
  container.dataset.state = "error";
  container.className = "flex flex-col items-center gap-3 text-center text-sm font-medium text-red-700";

  const text = document.createElement("p");
  text.textContent = message;
  container.append(text);

  if (onRetry) {
    const retryButton = document.createElement("button");
    retryButton.type = "button";
    retryButton.textContent = "Réessayer";
    retryButton.className =
      "rounded-lg border border-accent px-4 py-2 text-accent transition-colors hover:bg-accent hover:text-page focus:outline-none focus:ring-2 focus:ring-accent/40";
    retryButton.addEventListener("click", onRetry);
    container.append(retryButton);
  }
}

export function showSuccess(container, message) {
  container.replaceChildren();
  container.dataset.state = "success";
  container.className = "text-center text-sm font-medium text-green-700";
  container.textContent = message;
}

export function clearMessage(container) {
  container.replaceChildren();
  container.removeAttribute("data-state");
  container.className = "";
}
