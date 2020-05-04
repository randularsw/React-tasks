import React, { Component } from "react";

class Login extends Component {
  state = {
    loginModel: { email: "", password: "" },
  };

  handleChange = (e) => {
    const loginModel = this.state.loginModel;
    loginModel[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ loginModel });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.loginModel);
  };
  render() {
    const { loginModel } = this.state;
    return (
      <div className="my-5 mx-auto" style={{ width: "50%" }}>
        <h4>Login</h4>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={loginModel.email}
              onChange={this.handleChange}
              name="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={loginModel.password}
              onChange={this.handleChange}
              name="password"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
