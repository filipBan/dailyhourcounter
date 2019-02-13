import { connect } from "react-redux";
import InstallInstructions from "./InstallInstructions";

const mapStateToProps = state => ({
  open: state.ui.install.installInstructionsOpen
});

export default connect(mapStateToProps)(InstallInstructions);
