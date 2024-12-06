import React from 'react';
import './List.css';

const List = ({ items, renderItem, className = '' }) => {
  return (
    <ul className={`list ${className}`}>
      {items.map((item, index) => (
        <li key={index} className="list-item">
          {renderItem ? renderItem(item) : item}
        </li>
      ))}
    </ul>
  );
};

export default List;
