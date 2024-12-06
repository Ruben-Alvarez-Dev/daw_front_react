import React from 'react';
import styles from './List.module.css';

const List = ({ items, renderItem, className = '' }) => {
  return (
    <ul className={`${styles.list} ${className}`}>
      {items.map((item, index) => (
        <li key={index} className={styles.listItem}>
          {renderItem ? renderItem(item) : item}
        </li>
      ))}
    </ul>
  );
};

export default List;
