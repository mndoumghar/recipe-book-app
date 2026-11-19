import { validateRecipeForm, hasErrors, ALLOWED_DIFFICULTIES } from "../utils/validation.js";

/**
 * Builds the "add a recipe" form. Validation and submission wiring live
 * here; the actual POST call and card insertion are the caller's job,
 * passed in as `onSubmit`.
 */
export function createRecipeForm({ onSubmit }) {
  const form = document.createElement("form");
  form.noValidate = true;
  form.className = "grid gap-4 rounded-2xl border border-ink/10 bg-page p-6 shadow-sm md:p-8";

  const heading = document.createElement("h2");
  heading.textContent = "Ajouter une recette";
  heading.className = "text-xl font-bold text-ink";

  const fields = {
    name: buildTextField({ id: "recipe-name", label: "Nom", type: "text" }),
    cuisine: buildTextField({ id: "recipe-cuisine", label: "Cuisine", type: "text" }),
    difficulty: buildSelectField({
      id: "recipe-difficulty",
      label: "Difficulté",
      options: ALLOWED_DIFFICULTIES,
    }),
    prepTimeMinutes: buildTextField({
      id: "recipe-prep-time",
      label: "Temps de préparation (minutes)",
      type: "number",
    }),
  };

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Ajouter la recette";
  submitButton.className =
    "rounded-lg bg-accent px-5 py-3 font-semibold text-page transition-colors hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent/40 disabled:cursor-not-allowed disabled:opacity-50";

  const formMessage = document.createElement("p");
  formMessage.setAttribute("role", "status");
  formMessage.setAttribute("aria-live", "polite");
  formMessage.className = "min-h-[1.25rem] text-sm font-medium";

  form.append(
    heading,
    fields.name.wrapper,
    fields.cuisine.wrapper,
    fields.difficulty.wrapper,
    fields.prepTimeMinutes.wrapper,
    formMessage,
    submitButton
  );

  function readValues() {
    return {
      name: fields.name.input.value,
      cuisine: fields.cuisine.input.value,
      difficulty: fields.difficulty.input.value,
      prepTimeMinutes: fields.prepTimeMinutes.input.value,
    };
  }

  function revalidateField(key) {
    const errors = validateRecipeForm(readValues());
    fields[key].setError(errors[key]);
  }

  Object.keys(fields).forEach((key) => {
    const eventName = key === "difficulty" ? "change" : "input";
    fields[key].input.addEventListener(eventName, () => revalidateField(key));
  });

  let isSubmitting = false;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    const values = readValues();
    const errors = validateRecipeForm(values);
    Object.entries(errors).forEach(([key, msg]) => fields[key].setError(msg));

    if (hasErrors(errors)) {
      formMessage.textContent = "Corrigez les champs en erreur avant d'envoyer le formulaire.";
      formMessage.className = "min-h-[1.25rem] text-sm font-medium text-red-700";
      return;
    }

    isSubmitting = true;
    submitButton.disabled = true;
    formMessage.textContent = "Envoi en cours...";
    formMessage.className = "min-h-[1.25rem] text-sm font-medium text-ink/70";

    try {
      await onSubmit({
        name: values.name.trim(),
        cuisine: values.cuisine.trim(),
        difficulty: values.difficulty,
        prepTimeMinutes: Number(values.prepTimeMinutes),
      });

      formMessage.textContent = "Recette ajoutée avec succès (valable pour cette session).";
      formMessage.className = "min-h-[1.25rem] text-sm font-medium text-green-700";
      form.reset();
      Object.values(fields).forEach((field) => field.setError(null));
    } catch (error) {
      formMessage.textContent = error?.message || "Une erreur est survenue lors de l'ajout de la recette.";
      formMessage.className = "min-h-[1.25rem] text-sm font-medium text-red-700";
    } finally {
      isSubmitting = false;
      submitButton.disabled = false;
    }
  });

  return form;
}

function fieldShell({ id, label }) {
  const wrapper = document.createElement("div");
  wrapper.className = "flex flex-col gap-1";

  const labelEl = document.createElement("label");
  labelEl.htmlFor = id;
  labelEl.textContent = label;
  labelEl.className = "text-sm font-medium text-ink";

  const error = document.createElement("p");
  error.id = `${id}-error`;
  error.className = "min-h-[1.25rem] text-sm text-red-700";
  error.setAttribute("role", "alert");

  return { wrapper, labelEl, error };
}

const fieldInputClasses =
  "rounded-xl border border-ink/10 bg-page px-4 py-2 text-ink outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/20";

function buildTextField({ id, label, type }) {
  const { wrapper, labelEl, error } = fieldShell({ id, label });

  const input = document.createElement("input");
  input.id = id;
  input.name = id;
  input.type = type;
  if (type === "number") {
    input.min = "1";
    input.max = "300";
  }
  input.className = fieldInputClasses;
  input.setAttribute("aria-describedby", error.id);

  wrapper.append(labelEl, input, error);

  return {
    wrapper,
    input,
    setError: (message) => applyError(input, error, message),
  };
}

function buildSelectField({ id, label, options }) {
  const { wrapper, labelEl, error } = fieldShell({ id, label });

  const select = document.createElement("select");
  select.id = id;
  select.name = id;
  select.className = fieldInputClasses;
  select.setAttribute("aria-describedby", error.id);

  const placeholderOption = document.createElement("option");
  placeholderOption.value = "";
  placeholderOption.textContent = "Choisissez une difficulté";
  select.append(placeholderOption);

  options.forEach((optionValue) => {
    const option = document.createElement("option");
    option.value = optionValue;
    option.textContent = optionValue;
    select.append(option);
  });

  wrapper.append(labelEl, select, error);

  return {
    wrapper,
    input: select,
    setError: (message) => applyError(select, error, message),
  };
}

function applyError(input, errorEl, message) {
  errorEl.textContent = message || "";
  input.setAttribute("aria-invalid", message ? "true" : "false");
  input.classList.toggle("border-red-500", Boolean(message));
}
