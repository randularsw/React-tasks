import React, { Component } from 'react';

export default class Counter extends Component {

    componentDidUpdate(p, s) {
        console.log('counter-componentDidUpdate');
        console.log(p);
        console.log(s);
    }
    componentWillUnmount() {
        console.log('counter-ComponentWillUnmount');
    }

    render() {
        console.log('Counter-Render');
        const { id, counter, onIncrement, onDecrement, onDelete } = this.props;
        return (
            <div className="container">
                <h4>Item {id}</h4>
                <div className="row">
                    <div className="col-4"></div>
                    <div className="col-1">
                        <span className={this.getBadgeClasses()}><b>{this.formatCount()}</b></span>
                    </div>
                    <div className="col">
                        <button onClick={() => onIncrement(counter)} className="btn btn-secondary m-2">+</button>
                        <button onClick={() => onDecrement(counter)} className="btn btn-secondary m-2" disabled={counter.value === 0 ? 'disables' : ''}>-</button>
                        <button onClick={() => onDelete(counter.id)} className="btn btn-danger m-2">Delete</button>
                    </div>
                    <div className="col-3"></div>
                </div>
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
