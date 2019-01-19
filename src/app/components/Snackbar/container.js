import { connect } from "react-redux";
import Snackbar from "./Snackbar";

import { resetSnackbar } from "../../store/ui/snackbar/actions";

const mapStateToProps = state => ({
  ...state.ui.snackbar
});

const mapDispatchToProps = dispatch => ({
  resetSnackbar: () => dispatch(resetSnackbar())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Snackbar);
