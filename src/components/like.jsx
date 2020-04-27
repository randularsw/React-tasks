import React, { Component } from 'react';

class Like extends Component {
    render() { 
        let heartClass = 'fa-heart '
        if(this.props.liked){
            heartClass += 'fas';
        }else{
            heartClass += 'far';
        }
        return ( <i style={{cursor: 'pointer'}} onClick={this.props.onClick} className={heartClass}></i> );
    }
}
 
export default Like;