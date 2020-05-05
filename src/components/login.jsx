import React, { Component } from "react";
import Joi from "joi-browser";
import { Link } from "react-router-dom";

class Login extends Component {
  state = {
    loginModel: { email: "", password: "" },
    loginErrors: {},
  };

  schema = {
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  validate() {
    const { error } = Joi.validate(this.state.loginModel, this.schema, {
      abortEarly: false,
    });
    if (!error) return null;
    const errors = {};
    for (let item of error.details) {
      this.state.loginErrors[item.path[0]] = item.message;
    }
    return errors;
  }

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.loginErrors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const loginModel = { ...this.state.loginModel };
    loginModel[input.name] = input.value;

    this.setState({ loginModel, loginErrors: errors });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ loginErrors: this.state.loginErrors || {} });
    if (errors) return;
    console.log(this.state.loginModel);
  };
  render() {
    const { loginModel, loginErrors } = this.state;
    return (
      <div className="my-5 mx-auto" style={{ width: "50%" }}>
        <h4>Login</h4>
        <Link to="/register">Register</Link> instead
        <br />
        <br />
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="text"
              id="email"
              className="form-control"
              value={loginModel.email}
              onChange={this.handleChange}
              name="email"
            />
            {loginErrors.email && (
              <div className="alert alert-danger">{loginErrors.email}</div>
            )}
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
            {loginErrors.password && (
              <div className="alert alert-danger">{loginErrors.password}</div>
            )}
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
