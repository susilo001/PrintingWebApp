const Card = ({ children, className }) => {
  return (
    <div
      className={`card-compact card border shadow-lg hover:bg-base-200 ${className}`}
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

const Image = ({ src, alt, className, srcSet, width, height }) => {
  return (
    <figure className="bg-base-200">
      <img
        src={src}
        alt={alt}
        srcSet={srcSet}
        sizes="(max-width: 674px) 100vw, 674px"
        width={width}
        height={height}
        className={`aspect-square h-32 w-32 sm:h-52 sm:w-52 object-contain ${className}`}
      />
    </figure>
  );
};

Card.Image = Image;
Card.Body = Body;
Card.Title = Title;
Card.Actions = Actions;

export default Card;
