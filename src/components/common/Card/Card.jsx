import './Card.css';

const Card = ({ 
  className = '', 
  children,
  'card-header': header,
  'card-body': body,
  'card-footer': footer 
}) => {
  return (
    <div className={`card ${className}`}>
      {children || (
        <>
          {header && <div className="card-header">{header}</div>}
          {body && <div className="card-body">{body}</div>}
          {footer && <div className="card-footer">{footer}</div>}
        </>
      )}
    </div>
  );
};

export default Card;
