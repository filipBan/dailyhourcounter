export const RESET_SNACKBAR = "RESET_SNACKBAR";
export const UPDATES_AVAILABLE = "UPDATES_AVAILABLE";

export const resetSnackbar = () => ({ type: RESET_SNACKBAR });

export const notifyAboutUpdates = () => ({ type: UPDATES_AVAILABLE });
