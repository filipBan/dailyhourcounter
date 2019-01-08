import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import TopBar from "./TopBar";
import { toggleDrawer } from "../SideDrawer/actions";
import { handleCalendarChange } from "../../modules/DailyForm/actions";

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
