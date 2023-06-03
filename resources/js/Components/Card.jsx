const Card = ({ children, className }) => {
  return (
    <div
      className={`card card-compact border shadow-lg hover:bg-base-200 ${className}`}
    >
      {children}
    </div>
  );
};

const Body = ({ children, className }) => {
  return <div className={`card-body ${className}`}>{children}</div>;
};

const Title = ({ children, className }) => {
  return (
    <h3 className={`card-title text-xs sm:text-base ${className}`}>
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
      <img
        src={src}
        alt={alt}
        srcSet={srcSet}
        className={`aspect-square object-contain ${className}`}
      />
    </figure>
  );
};

Card.Image = Image;
Card.Body = Body;
Card.Title = Title;
Card.Actions = Actions;

export default Card;
