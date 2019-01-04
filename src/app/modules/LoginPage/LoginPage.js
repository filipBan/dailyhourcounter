import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import Button from "../../components/Button";

class LoginPage extends Component {
  submitForm(e) {
    e.preventDefault();
    const { email, password } = this.props.auth;
    this.props.logInWithEmailAndPassword(email, password);
  }

  handleInputChange(field, event) {
    const { value } = event.target;
    this.props.updateInput(field, value);
  }

  render() {
    if (this.props.auth.isLoggedIn) {
      return <Redirect to="/today" />;
    }

    const { email, password } = this.props;
    return (
      <div className="login-page">
        I should see this
        <div className="login-form">
          <form onSubmit={event => this.submitForm(event)}>
            <input
              aria-label="email"
              type="email"
              value={email}
              onChange={e => this.handleInputChange("email", e)}
            />
            <input
              aria-label="email"
              type="password"
              value={password}
              onChange={e => this.handleInputChange("password", e)}
            />
            <Button type="submit">Login</Button>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginPage;
