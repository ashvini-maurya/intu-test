import React, { Component } from "react";
import axios from "axios";
import auth from "../../auth";

class LandingPage extends Component {
  state = {
    username: "",
    password: ""
  };

  loginInputChangeHandler = event => {
    const name = event.target.name;
    this.setState({
      [name]: event.target.value
    });
  };

  loginSubmitHandler = event => {
    event.preventDefault();
    axios({
      method: "POST",
      url:
        "https://dl5opah3vc.execute-api.ap-south-1.amazonaws.com/latest/login",
      auth: { username: this.state.username, password: this.state.password }
    })
      .then(res => {
        this.props.history.push("/app");
        localStorage.setItem("token", res.data.token)
        auth.login(() => {
          this.props.history.push("/app");
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-5 col-lg-4 col-sm-6 main-body-login mt-5 px-0">
            <div className="main-panel p-5">
              <h5 className="text-center logIn">Log In</h5>
              <form
                name="form"
                style={{ marginTop: "4rem", position: "relative" }}
                onSubmit={this.loginSubmitHandler}
              >
                <div className="form-group text-left">
                  <span>User name</span>
                  <input
                    placeholder="Enter Username"
                    className="form-control"
                    type="text"
                    name="username"
                    value={this.state.username}
                    required
                    onChange={this.loginInputChangeHandler}
                  />
                </div>
                <div className="form-group mt-4 text-left">
                  <span>Password</span>
                  <input
                    placeholder="Enter Password"
                    className="form-control"
                    type="password"
                    name="password"
                    value={this.state.password}
                    required
                    onChange={this.loginInputChangeHandler}
                  />
                </div>
                <div className="row">
                  <div className="col-sm-12 text-center mt-5">
                    <button
                      type="submit"
                      onClick={this.loginSubmitHandler}
                      className="btn btn-primary login-btn"
                    >
                      Login
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
