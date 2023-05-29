const Card = ({ children, className }) => {
  return <div className={`card ${className}`}>{children}</div>;
};

const Body = ({ children, className }) => {
  return <div className={`card-body ${className}`}>{children}</div>;
};

const Title = ({ children, className }) => {
  return (
    <h3 className={`card-title text-xs sm:text-base  ${className}`}>
      {children}
    </h3>
  );
};

const Actions = ({ children, className }) => {
  return <div className={`card-actions ${className}`}>{children}</div>;
};

const Image = ({ src, alt, className, srcSet }) => {
  return (
    <figure>
      <img src={src} alt={alt} className={className} srcSet={srcSet} />
    </figure>
  );
};

Card.Image = Image;
Card.Body = Body;
Card.Title = Title;
Card.Actions = Actions;

export default Card;
