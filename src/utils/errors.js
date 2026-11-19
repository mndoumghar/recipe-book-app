/**
 * Maps an Axios/JS error to a user-friendly French message.
 * Keeps technical details out of the UI; callers may still console.error them.
 */
export function getErrorMessage(error) {
  if (error?.response) {
    const { status } = error.response;
    if (status === 404) return "Recette introuvable (erreur 404).";
    if (status >= 500) return "Le serveur a rencontré une erreur. Veuillez réessayer plus tard.";
    return `Une erreur est survenue (code ${status}).`;
  }

  if (error?.request) {
    return "Impossible de contacter le serveur. Vérifiez votre connexion.";
  }
  
  return "Une erreur inattendue est survenue.";
}
