import React from "react";
import { Button } from "semantic-ui-react";

import "./style.css";

function SaveButton(props) {
  return (
    <div className="save-button-container">
      <Button
        secondary={props.savingData}
        fluid
        size="huge"
        primary
        onClick={() => props.saveHoursAndBreaksToFirebase()}
        loading={props.savingData}
        toggle
        disabled={props.disabled}
      >
        SAVE
      </Button>
    </div>
  );
}

export default SaveButton;
