export const NAME_MIN = 3;
export const NAME_MAX = 60;
export const PREP_TIME_MIN = 1;
export const PREP_TIME_MAX = 300;
export const ALLOWED_DIFFICULTIES = ["Easy", "Medium", "Hard"];

export function validateName(value) {
  const trimmed = (value ?? "").trim();
  if (!trimmed) return "Le nom est obligatoire.";
  if (trimmed.length < NAME_MIN || trimmed.length > NAME_MAX) {
    return `Le nom doit contenir entre ${NAME_MIN} et ${NAME_MAX} caractères.`;
  }
  return null;
}

export function validateCuisine(value) {
  const trimmed = (value ?? "").trim();
  if (!trimmed) return "La cuisine est obligatoire.";
  return null;
}

export function validateDifficulty(value) {
  if (!value || !ALLOWED_DIFFICULTIES.includes(value)) {
    return "Choisissez une difficulté parmi les valeurs proposées.";
  }
  return null;
}

export function validatePrepTime(value) {
  const raw = String(value ?? "").trim();
  if (raw === "") return "Le temps de préparation est obligatoire.";

  const number = Number(raw);
  if (!Number.isInteger(number)) {
    return "Le temps de préparation doit être un nombre entier.";
  }
  if (number < PREP_TIME_MIN || number > PREP_TIME_MAX) {
    return `Le temps de préparation doit être compris entre ${PREP_TIME_MIN} et ${PREP_TIME_MAX} minutes.`;
  }
  return null;
}

export function validateRecipeForm({ name, cuisine, difficulty, prepTimeMinutes }) {
  return {
    name: validateName(name),
    cuisine: validateCuisine(cuisine),
    difficulty: validateDifficulty(difficulty),
    prepTimeMinutes: validatePrepTime(prepTimeMinutes),
  };
}

export function hasErrors(errors) {
  return Object.values(errors).some(Boolean);
}
