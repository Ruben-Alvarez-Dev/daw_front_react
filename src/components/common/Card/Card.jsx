import React from 'react';
import styles from './Card.module.css';

const Card = ({ 
  className = '', 
  'card-header': header,
  'card-body': body,
  'card-footer': footer 
}) => {
  return (
    <div className={`${styles.card} ${className}`}>
      {header && <div className={styles.cardHeader}>{header}</div>}
      {body && <div className={styles.cardBody}>{body}</div>}
      {footer && <div className={styles.cardFooter}>{footer}</div>}
    </div>
  );
};

export default Card;
