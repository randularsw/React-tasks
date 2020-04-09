import React, { Component } from 'react';

class Counter extends Component {
    state = {
        count: 0,
        tags: []
    }

    renderTags() {
        if (this.state.tags.length === 0) {
            return <p>There are no tags</p>;
        }
        return <ul>{this.state.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>;
    }

    handleIncrement = () => {
        this.setState({ count: this.state.count + 1 });
    }

    render() {

        return (
            <div className="container">
                <span className={this.getBadgeClasses()}><b>{this.formatCount()}</b></span>
                <button onClick={this.handleIncrement} className="btn btn-secondary">Increment</button>
                <div>{this.renderTags()}</div>
                {this.state.tags.length === 0 && "Enter a new tag"}
            </div>
        );
    }
    getBadgeClasses() {
        let classes = "badge m-2 p-2 ";
        if (this.state.count === 0) {
            classes += "badge-warning";
        }
        else {
            classes += "badge-primary";
        }
        return classes;
    }

    formatCount() {
        const { count } = this.state;
        return (count === 0) ? "Zero" : count;
    }
}

export default Counter;
