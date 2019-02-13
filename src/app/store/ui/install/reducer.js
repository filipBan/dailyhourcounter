const initialState = {
  installPromptOpen: false,
  installInstructionsOpen: false
};

const install = (state = {}, action) => {
  switch (action.type) {
    case "TOGGLE_INSTALL_PROMPT":
      return {
        installPromptOpen: !state.installPromptOpen,
        installInstructionsOpen: false
      };
    case "SHOW_INSTALL_INSTRUCTIONS":
      return {
        installPromptOpen: false,
        installInstructionsOpen: true
      };
    default:
      return initialState;
  }
};

export default install;
