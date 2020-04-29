import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Like from './like';
import Pagination from './pagination';
import ListGroup from './listGroup';
import { getGenres } from '../services/fakeGenreService';

export default class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        pageSize: 4,
        currentPage: 1
    }

    componentDidMount() {
        const genres = [{name: 'All',_id:1}, ...getGenres()];
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
        const { movies: allMovies, genres, pageSize, currentPage, selectedGenre } = this.state;
        if (count === 0) {
            return <h4>No movies yet.</h4>
        }
        const filtered = selectedGenre && selectedGenre._id!==1 ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;
        const movies = this.paginate(filtered, currentPage, pageSize);
        return (
            <div className="row container-fluid">
                <div className="col-3" style={{ marginTop: '175px', marginLeft: '100px' }}>
                    <ListGroup items={genres} selectedGenre={selectedGenre} onGenreSelect={this.handleGenreSelect} />
                </div>
                <div className="col m-5">
                    <h4>{filtered.length} movies available</h4>
                    <table className="table mt-5">
                        <thead>
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Genre</th>
                                <th scope="col">Stock</th>
                                <th scope="col">Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {movies.map(movie => (
                                <tr key={movie._id}>
                                    <th>{movie.title}</th>
                                    <td>{movie.genre.name}</td>
                                    <td>{movie.numberInStock}</td>
                                    <td>{movie.dailyRentalRate}</td>
                                    <td><Like liked={movie.liked} onClick={() => this.handleLike(movie)} /></td>
                                    <td><button onClick={() => this.handleDelete(movie)} className="btn btn-danger">Delete</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className='d-flex justify-content-center'>
                        <Pagination count={filtered.length} pageSize={pageSize} currentPage={currentPage} onPageChange={this.handlePageChange} />
                    </div>
                </div>
            </div>
        );
    }
}
