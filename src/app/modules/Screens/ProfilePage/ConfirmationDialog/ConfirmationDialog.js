import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import styled from "styled-components";

const Title = styled.p`
  font-size: 2rem;
  padding: 2rem 0 0 2rem;
  font-weight: bold;
  margin: none;
`;

const Content = styled.p`
  font-size: 1.6rem;
  margin: none;
`;

class ConfirmationDialog extends React.Component {
  handleClose = () => {
    this.props.onClose();
  };

  handleUserDelete = () => {
    this.props.deleteUser();
    this.props.onClose();
  };

  render() {
    const { open, deleteUser } = this.props;

    return (
      <Dialog
        onClose={this.handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <Title>Are you sure?</Title>
        <DialogContent>
          <Content>
            If you delete your account all your data will be irreversibly lost.
            There will be no way to restore any of it.
          </Content>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={deleteUser} color="secondary" variant="outlined">
              Delete
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    );
  }
}

export default ConfirmationDialog;
