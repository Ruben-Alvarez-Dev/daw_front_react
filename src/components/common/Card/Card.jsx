import React from 'react';
import styles from './Card.module.css';

const Card = ({ 
  className = '', 
  children,
  'card-header': header,
  'card-body': body,
  'card-footer': footer 
}) => {
  // Si se proporcionan children, los usamos directamente
  if (children) {
    return (
      <div className={`${styles.card} ${className}`}>
        {children}
      </div>
    );
  }

  // Si no hay children, usamos el layout tradicional con header, body y footer
  return (
    <div className={`${styles.card} ${className}`}>
      {header && <div className={styles.cardHeader}>{header}</div>}
      {body && <div className={styles.cardBody}>{body}</div>}
      {footer && <div className={styles.cardFooter}>{footer}</div>}
    </div>
  );
};

export default Card;
