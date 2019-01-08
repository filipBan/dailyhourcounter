import { connect } from "react-redux";
import Notification from "./Notification";

import { closeNotificationModal } from "../../store/ui/notifications/actions";

const mapStateToProps = state => ({
  ...state.ui.notification,
  userId: state.auth.uid
});

const mapDispatchToProps = dispatch => ({
  closeNotificationModal: (userId, noticeId) =>
    dispatch(closeNotificationModal(userId, noticeId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification);
