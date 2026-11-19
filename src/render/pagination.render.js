export function renderPagination(container, { page, totalPages, onPrevious, onNext }) {
  container.replaceChildren();

  if (totalPages <= 1) {
    container.className = "";
    return;
  }

  container.className = "mt-2 flex items-center justify-center gap-3";

  const previousButton = document.createElement("button");
  previousButton.type = "button";
  previousButton.textContent = "Précédent";
  previousButton.disabled = page <= 1;
  previousButton.className = buttonClasses(previousButton.disabled);
  previousButton.addEventListener("click", onPrevious);

  const status = document.createElement("span");
  status.textContent = `Page ${page} / ${totalPages}`;
  status.className = "text-sm font-medium text-ink";
  status.setAttribute("aria-live", "polite");

  const nextButton = document.createElement("button");
  nextButton.type = "button";
  nextButton.textContent = "Suivant";
  nextButton.disabled = page >= totalPages;
  nextButton.className = buttonClasses(nextButton.disabled);
  nextButton.addEventListener("click", onNext);

  container.append(previousButton, status, nextButton);
}

function buttonClasses(disabled) {
  const base =
    "rounded-lg border px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent/40";
  return disabled
    ? `${base} cursor-not-allowed border-ink/10 text-ink/30`
    : `${base} border-accent text-accent hover:bg-accent hover:text-page`;
}
