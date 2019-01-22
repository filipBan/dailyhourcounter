import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import TopBar from "./TopBar";
import { toggleDrawer } from "../../store/ui/sideDrawer/actions";
import { handleCalendarChange } from "../../store/today/actions";

const mapStateToProps = state => ({
  today: state.today.today
});

const mapDispatchToProps = dispatch => ({
  toggleDrawer: open => dispatch(toggleDrawer(open)),
  handleCalendarChange: date => dispatch(handleCalendarChange(date))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TopBar)
);
