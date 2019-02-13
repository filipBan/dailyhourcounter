import { connect } from "react-redux";
import InstallPrompt from "./InstallPrompt";

import {
  toggleInstallPrompt,
  showInstallInstructions
} from "../../store/ui/install/actions";

const mapStateToProps = state => ({
  installPromptOpen: state.ui.install.installPromptOpen
});

const mapDispatchToProps = dispatch => ({
  toggleInstallPrompt: () => dispatch(toggleInstallPrompt()),
  showInstallInstructions: () => dispatch(showInstallInstructions())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InstallPrompt);
