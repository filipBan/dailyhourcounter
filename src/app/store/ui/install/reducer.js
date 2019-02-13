const initialState = {
  installPromptOpen: true
};

const install = (state = {}, action) => {
  switch (action.type) {
    case "TOGGLE_INSTALL_PROMPT":
      return {
        installPromptOpen: !state.installPromptOpen
      };
    case "SHOW_INSTALL_INSTRUCTIONS":
      return {
        installPromptOpen: false
      };
    default:
      return initialState;
  }
};

export default install;
