import { connect } from "react-redux";
import TimePicker from "./TimePicker";

//TODO
// refactor to stop passing props down to TimePicker. It can take most of them
// from state.today instead, will be cleaner

const mapStateToProps = (state, ownProps) => ({
  today: state.today.today,
  ...ownProps
});

export default connect(mapStateToProps)(TimePicker);
