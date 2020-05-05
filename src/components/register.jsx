import React, { Component } from "react";
import Joi from "joi-browser";
import { Link } from "react-router-dom";

class Register extends Component {
  state = {
    registerModel: { email: "", name: "", password: "" },
    registerErrors: {},
  };

  schema = {
    email: Joi.string().required().label("Email"),
    name: Joi.string().required().label("Name"),
    password: Joi.string().required().label("Password"),
  };

  validate() {
    const { error } = Joi.validate(this.state.registerModel, this.schema, {
      abortEarly: false,
    });
    if (!error) return null;
    const errors = {};
    for (let item of error.details) {
      this.state.registerErrors[item.path[0]] = item.message;
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
    const errors = { ...this.state.registerErrors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const registerModel = { ...this.state.registerModel };
    registerModel[input.name] = input.value;

    this.setState({ registerModel, registerErrors: errors });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ registerErrors: this.state.registerErrors || {} });
    if (errors) return;
    console.log(this.state.registerModel);
  };
  render() {
    const { registerModel, registerErrors } = this.state;
    return (
      <div className="my-5 mx-auto" style={{ width: "50%" }}>
        <h4>Register</h4>
        <Link to="/login">Login</Link> instead
        <br />
        <br />
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={registerModel.email}
              onChange={this.handleChange}
              name="email"
            />
            {registerErrors.email && (
              <div className="alert alert-danger">{registerErrors.email}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="name"
              id="name"
              className="form-control"
              value={registerModel.name}
              onChange={this.handleChange}
              name="name"
            />
            {registerErrors.name && (
              <div className="alert alert-danger">{registerErrors.name}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={registerModel.password}
              onChange={this.handleChange}
              name="password"
            />
            {registerErrors.password && (
              <div className="alert alert-danger">
                {registerErrors.password}
              </div>
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    );
  }
}

export default Register;
