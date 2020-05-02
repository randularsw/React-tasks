import React, { Component } from 'react';
import Like from './like';

class MoviesTable extends Component {
    state = {}

    raiseSort = path => {
        const sortColumn = this.props.sortColumn;
        if (sortColumn.path === path) {
            sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
        } else {
            sortColumn.path = path;
            sortColumn.order = 'asc';
        }
        this.props.onSort(sortColumn);
    }

    renderSortIcon = column=>{
        const {sortColumn} = this.props;
        if(column!==sortColumn.path) return null;
        if(sortColumn.order==='asc') return <i className="fas fa-sort-up"></i>;
        return <i className="fas fa-sort-down"></i>;
    }

    render() {
        const { movies, onDelete, onLike } = this.props;
        return (
            <table className="table mt-5">
                <thead>
                    <tr>
                        <th style={{ cursor: 'pointer' }} onClick={() => this.raiseSort('title')} scope="col">Title {this.renderSortIcon('title')} </th>
                        <th style={{ cursor: 'pointer' }} onClick={() => this.raiseSort('genre.name')} scope="col">Genre {this.renderSortIcon('genre.name')}</th>
                        <th style={{ cursor: 'pointer' }} onClick={() => this.raiseSort('numberInStock')} scope="col">Stock {this.renderSortIcon('numberInStock')}</th>
                        <th style={{ cursor: 'pointer' }} onClick={() => this.raiseSort('dailyRentalRate')} scope="col">Rate {this.renderSortIcon('dailyRentalRate')}</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map(movie => (
                        <tr key={movie._id}>
                            <th>{movie.title}</th>
                            <td>{movie.genre.name}</td>
                            <td>{movie.numberInStock}</td>
                            <td>{movie.dailyRentalRate}</td>
                            <td><Like liked={movie.liked} onClick={() => onLike(movie)} /></td>
                            <td><button onClick={() => onDelete(movie)} className="btn btn-danger">Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}

export default MoviesTable;
