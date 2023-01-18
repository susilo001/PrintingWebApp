const Carousel = ({ children, className }) => {
  return (
    <div
      className={`flex overflow-x-auto scroll-smooth hover:scroll-auto  ${className}`}
    >
      {children}
    </div>
  );
};

const Item = ({ children, className }) => {
  return <div className={`carousel-item ${className}`}>{children}</div>;
};

Carousel.Item = Item;

export default Carousel;
