import React from 'react';
const ListGroup = (props) => {
    const { items, onGenreSelect, selectedGenre } = props;
    return (
        <ul className="list-group">
            {items.map(item =>(
                <li style={{cursor: 'pointer'}} onClick={()=>onGenreSelect(item)} key={item._id} className={item===selectedGenre?'list-group-item active':'list-group-item'}>{item.name}</li>
            ))}
        </ul>
    );
}

export default ListGroup;