import React, { Component } from "react";
import { LoginService } from "../Services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Loading from "./Loading";
import "./signUpComponent.css";

export default class SignUpComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isShowPassword: false,
      isShowRepassword: false,
    };
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    this.setState({ isLoading: true });
    const res = await LoginService.register({
      email: evt.target.email.value,
      password: evt.target.password.value,
      repassword: evt.target.repassword.value,
      firstName: evt.target.firstName.value,
      lastName: evt.target.lastName.value,
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
        <form onSubmit={this.handleSubmit.bind(this)}>
          <h3>Sign Up</h3>

          <div className="mb-3">
            <label htmlFor="firstName">First name</label>
            <input
              id="firstName"
              type="text"
              className="form-control"
              placeholder="First name"
              name="firstName"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="lastName">Last name</label>
            <input
              id="lastName"
              type="text"
              className="form-control"
              placeholder="Last name"
              name="lastName"
              required
            />
          </div>

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

          <div className="mb-3">
            <div>
              <label htmlFor="repassword" className="me-2">
                Confirm Password
              </label>
              <FontAwesomeIcon
                className={this.state.isShowRepassword ? "d-none" : ""}
                icon={faEye}
                onClick={() =>
                  this.setState({
                    isShowRepassword: !this.state.isShowRepassword,
                  })
                }
              />
              <FontAwesomeIcon
                className={!this.state.isShowRepassword ? "d-none" : ""}
                icon={faEyeSlash}
                onClick={() =>
                  this.setState({
                    isShowRepassword: !this.state.isShowRepassword,
                  })
                }
              />
            </div>
            <input
              id="repassword"
              type={this.state.isShowRepassword ? "text" : "password"}
              className="form-control"
              placeholder="Enter password"
              name="repassword"
              autoComplete="on"
            />
          </div>

          <div className="d-grid mt-4">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
          <p className="forgot-password text-right">
            Already registered <a href="/sign-in">sign in?</a>
          </p>
        </form>

        <Loading isLoading={this.state.isLoading} />
      </div>
    );
  }
}
