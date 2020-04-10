import React, { Component } from 'react';

export default class Counter extends Component {

    render() {
        return (
            <div className="container">
                <h4>Item {this.props.id}</h4>
                <span className={this.getBadgeClasses()}><b>{this.formatCount()}</b></span>
                <button onClick={() => this.props.onIncrement(this.props.counter)} className="btn btn-secondary m-2">Increment</button>
                <button onClick={() => this.props.onDelete(this.props.counter.id)} className="btn btn-danger m-2">Delete</button>
            </div>
        );
    }

    getBadgeClasses() {
        let classes = "badge m-2 p-2 ";
        if (this.props.counter.value === 0) {
            classes += "badge-warning";
        }
        else {
            classes += "badge-primary";
        }
        return classes;
    }

    formatCount() {
        const { value } = this.props.counter;
        return (value === 0) ? "Zero" : value;
    }
}
