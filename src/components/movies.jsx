import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Pagination from './pagination';
import ListGroup from './listGroup';
import { getGenres } from '../services/fakeGenreService';
import MoviesTable from './moviesTable';
import _ from 'lodash';

export default class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        pageSize: 4,
        currentPage: 1,
        sortColumn: { path: 'title', order: 'asc' }
    }

    componentDidMount() {
        const genres = [{ name: 'All', _id: 1 }, ...getGenres()];
        this.setState({ movies: getMovies(), genres });
    }

    handleLike = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index].liked = !movies[index].liked;
        this.setState({ movies });
    }

    handleDelete = (movie) => {
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({ movies: movies });
    }

    handleSort = (sortColumn) => {
        this.setState({ sortColumn });
    }

    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    }

    handleGenreSelect = (genre) => {
        this.setState({ selectedGenre: genre, currentPage: 1 });
    }

    paginate(items, pageNumber, pageSize) {
        const startIndex = (pageNumber - 1) * pageSize;
        return items.slice(startIndex, startIndex + pageSize);
    }

    render() {
        const { length: count } = this.state.movies;
        const { movies: allMovies, genres, pageSize, currentPage, selectedGenre, sortColumn } = this.state;
        if (count === 0) {
            return <h4>No movies yet.</h4>
        }
        // filter
        const filtered = selectedGenre && selectedGenre._id !== 1 ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;
        // sort
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])
        // paginate
        const movies = this.paginate(sorted, currentPage, pageSize);
        return (
            <div className="row container-fluid">
                <div className="col-3" style={{ marginTop: '175px', marginLeft: '100px' }}>
                    <ListGroup items={genres} selectedGenre={selectedGenre} onGenreSelect={this.handleGenreSelect} />
                </div>
                <div className="col m-5">
                    <h4>{filtered.length} movies available</h4>
                    <MoviesTable movies={movies} sortColumn={sortColumn} onLike={this.handleLike} onDelete={this.handleDelete} onSort={this.handleSort} />
                    <div className='d-flex justify-content-center'>
                        <Pagination count={filtered.length} pageSize={pageSize} currentPage={currentPage} onPageChange={this.handlePageChange} />
                    </div>
                </div>
            </div>
        );
    }
}
