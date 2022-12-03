import React, { Component } from "react";
import { LoginService } from "../Services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Loading from "./Loading";

export default class SignInComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isShowPassword: false,
    };
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    this.setState({ isLoading: true });
    const res = await LoginService.login({
      email: evt.target.email.value,
      password: evt.target.password.value,
    });
    if (res.status === 200) {
      localStorage.setItem("token", res.data.token);
      window.location.reload();
    }
    this.setState({ isLoading: false });
  }

  render() {
    return (
      <div id="signup-container" className="mt-5">
        {/* Using form for sign-in: */}
        <form onSubmit={this.handleSubmit.bind(this)}>
          <h3>Sign In</h3>

          <div className="mb-3">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              className="form-control"
              placeholder="Enter email"
              name="email"
              required
            />
          </div>

          <div className="mb-3">
            <div>
              <label htmlFor="password" className="me-2">
                Password
              </label>
              <FontAwesomeIcon
                className={this.state.isShowPassword ? "d-none" : ""}
                icon={faEye}
                onClick={() =>
                  this.setState({
                    isShowPassword: !this.state.isShowPassword,
                  })
                }
              />
              <FontAwesomeIcon
                className={!this.state.isShowPassword ? "d-none" : ""}
                icon={faEyeSlash}
                onClick={() =>
                  this.setState({
                    isShowPassword: !this.state.isShowPassword,
                  })
                }
              />
            </div>
            <input
              id="password"
              type={this.state.isShowPassword ? "text" : "password"}
              className="form-control"
              placeholder="Enter password"
              name="password"
              autoComplete="on"
              required
            />
          </div>

          {/* Displaying check box and "Remember me" text */}
          <div className="mb-3">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label className="custom-control-label" htmlFor="customCheck1">
                Remember me
              </label>
            </div>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>

        <Loading isLoading={this.state.isLoading} />
      </div>
    );
  }
}
