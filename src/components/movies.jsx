import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./pagination";
import ListGroup from "./listGroup";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";

export default class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [{ name: "All", _id: 1 }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies: movies });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSearch = ({ currentTarget: query }) => {
    this.setState({
      searchQuery: query.value,
      selectedGenre: null,
      currentPage: 1,
    });
  };

  paginate(items, pageNumber, pageSize) {
    const startIndex = (pageNumber - 1) * pageSize;
    return items.slice(startIndex, startIndex + pageSize);
  }

  render() {
    const { searchQuery } = this.state;
    const { length: count } = this.state.movies;
    const {
      movies: allMovies,
      genres,
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn,
    } = this.state;
    if (count === 0) {
      return <h4>No movies yet.</h4>;
    }
    // filter
    let filtered = allMovies;
    if (selectedGenre && selectedGenre._id !== 1) {
      allMovies.filter((m) => m.genre._id === selectedGenre._id);
    } else if (searchQuery) {
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }
    // sort
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    // paginate
    const movies = this.paginate(sorted, currentPage, pageSize);
    return (
      <div className="row container-fluid">
        <div
          className="col-3"
          style={{ marginTop: "175px", marginLeft: "100px" }}
        >
          <ListGroup
            items={genres}
            selectedGenre={selectedGenre}
            onGenreSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col m-5">
          <h4>{filtered.length} movies available</h4>
          <Link to={"/movies/new"}> Add Movie</Link>
          <input
            type="text"
            name="searchQuery"
            className="form-control"
            placeholder="Search..."
            value={searchQuery}
            onChange={this.handleSearch}
          ></input>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <div className="d-flex justify-content-center">
            <Pagination
              count={filtered.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
}
