export default function ImageGallery({ images }) {
  return (
    <>
      {images.length === 1 && (
        <div className="mx-auto mt-6 max-w-2xl sm:px-6">
          <div className="aspect-w-3 aspect-h-4 overflow-hidden rounded-lg">
            <img
              src={images[0].url}
              alt={images[0].alt}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
      )}
      {images.length === 2 && (
        <div className="grid mt-6 gap-y-4 lg:grid-cols-2 lg:gap-8">
          <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
            <img
              src={images[0].url}
              alt={images[0].alt}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
            <img
              src={images[1].url}
              alt={images[1].alt}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
      )}
      {images.length === 3 && (
        <div className="mt-6 mx-auto grid gap-y-8 lg:grid-cols-2 lg:gap-8">
          <div className="aspect-w-3 aspect-h-4 overflow-hidden rounded-lg">
            <img
              src={images[0].url}
              alt={images[0].alt}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="grid gap-y-8">
            <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
              <img
                src={images[1].url}
                alt={images[1].alt}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
              <img
                src={images[2].url}
                alt={images[2].alt}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      )}
      {images.length === 4 && (
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-w-3 aspect-h-4 hidden overflow-hidden rounded-lg lg:block">
            <img
              src={images[0].url}
              alt={images[0].alt}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
              <img
                src={images[1].url}
                alt={images[1].alt}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
              <img
                src={images[2].url}
                alt={images[2].alt}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
          <div className="aspect-w-4 aspect-h-5 sm:overflow-hidden sm:rounded-lg lg:aspect-w-3 lg:aspect-h-4">
            <img
              src={images[3].url}
              alt={images[3].alt}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
      )}
    </>
  );
}
