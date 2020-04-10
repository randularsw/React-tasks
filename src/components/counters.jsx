import React, { Component } from 'react';
import Counter from './counter';

export default class Counters extends Component {
    state = {
        counters: [
            {id: 1, value: 0},
            {id: 2, value: 2},
            {id: 3, value: 5},
            {id: 4, value: 10}
        ]
    };

    handleIncrement=(counter)=>{
        const counters = [...this.state.counters];
        counters[counters.indexOf(counter)].value++;
        this.setState({counters});
    }

    handleDelete=(counterId)=>{
        // console.log('Handle Delete',counterId);
        const counters = this.state.counters.filter(c=> c.id!==counterId);
        this.setState({counters});
    }

    handleReset = () => {
        const counters = this.state.counters.map(c => {
            c.value=0;
            return c;
        })
        this.setState({ counters });
    }
    
    render() {
        return (
            <div>
                <button onClick={this.handleReset} className="btn btn-warning m-2">Reset</button>
                {this.state.counters.map(counter=> <Counter key={counter.id} counter={counter} onIncrement={this.handleIncrement} onDelete={this.handleDelete} /> )}
            </div>
        );
    }
}
