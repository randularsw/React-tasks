import React, { Component } from 'react';

class Counter extends Component {
    state = {
        count: 0
    }
    render() {
        return(
            <div className="container">
                <span className="badge badge-primary m-2">Hello {this.state.count}</span>
                <button className="btn btn-secondary">{this.formatCount()}</button>
            </div>
        );
    }
    formatCount(){
        const { count } = this.state;
        return <h1>{count}</h1>;
    }
}

export default Counter;
