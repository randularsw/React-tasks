import React, { Component } from "react";
import Joi from "joi-browser";
import { Link } from "react-router-dom";
import { getMovie, saveMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

class MovieDetail extends Component {
  state = {
    movieModel: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    movieErrors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Daily Rental Rate"),
  };

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });
    const movieId = this.props.match.params.id;
    if (movieId === "new") return;

    const movie = getMovie(movieId);
    if (!movie) return this.props.history.replace("/not-found");
    this.setState({ movieModel: this.mapToViewModel(movie) });
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  validate() {
    const { error } = Joi.validate(this.state.movieModel, this.schema, {
      abortEarly: false,
    });
    if (!error) return null;
    const errors = {};
    for (let item of error.details) {
      this.state.movieErrors[item.path[0]] = item.message;
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
    const errors = { ...this.state.movieErrors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const movieModel = { ...this.state.movieModel };
    movieModel[input.name] = input.value;

    this.setState({ movieModel, movieErrors: errors });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ movieErrors: this.state.movieErrors || {} });
    if (errors) return;
    console.log(this.state.movieModel);
    saveMovie(this.state.movieModel);
    this.props.history.push("/movies");
  };
  render() {
    const { movieModel, movieErrors, genres } = this.state;
    return (
      <div className="my-5 mx-auto" style={{ width: "50%" }}>
        <h4>movie</h4>
        <Link to="/movies">Back to Movies</Link>
        <br />
        <br />
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              className="form-control"
              value={movieModel.title}
              onChange={this.handleChange}
              name="title"
            />
            {movieErrors.title && (
              <div className="alert alert-danger">{movieErrors.title}</div>
            )}
          </div>
          <div className="formGroup">
            <label htmlFor="genreId">Genre</label>
            <select
              name="genreId"
              id="genreId"
              className="form-control"
              onChange={this.handleChange}
              value={movieModel.genreId}
            >
              <option value=""></option>
              {genres.map((genre) => (
                <option
                  key={genre._id}
                  value={genre._id}
                  // selected={genre._id === movieModel.genreId}
                >
                  {genre.name}
                </option>
              ))}
            </select>
            {movieErrors.genreId && (
              <div className="alert alert-danger">{movieErrors.genreId}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="numberInStock">Number in Stock</label>
            <input
              type="number"
              id="numberInStock"
              className="form-control"
              value={movieModel.numberInStock}
              onChange={this.handleChange}
              name="numberInStock"
            />
            {movieErrors.numberInStock && (
              <div className="alert alert-danger">
                {movieErrors.numberInStock}
              </div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="dailyRentalRate">Daily Rental Rate</label>
            <input
              type="number"
              id="dailyRentalRate"
              className="form-control"
              value={movieModel.dailyRentalRate}
              onChange={this.handleChange}
              name="dailyRentalRate"
            />
            {movieErrors.dailyRentalRate && (
              <div className="alert alert-danger">
                {movieErrors.dailyRentalRate}
              </div>
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </form>
      </div>
    );
  }
}

export default MovieDetail;
