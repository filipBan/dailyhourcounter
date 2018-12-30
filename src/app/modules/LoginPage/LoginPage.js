import React, { Component } from "react";
import { Redirect } from "react-router-dom";

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
        <div className="login-form">
          {/* <Form
            size="huge"
            className="form-container"
            onSubmit={event => this.submitForm(event)}
          >
            <Form.Field>
              <label>Email</label>
              <input
                aria-label="email"
                type="email"
                value={email}
                onChange={e => this.handleInputChange("email", e)}
              />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input
                aria-label="email"
                type="password"
                value={password}
                onChange={e => this.handleInputChange("password", e)}
              />
            </Form.Field>
            <Button type="submit" primary fluid size="huge" loading={false}>
              Login
            </Button>
          </Form> */}
        </div>
      </div>
    );
  }
}

export default LoginPage;
