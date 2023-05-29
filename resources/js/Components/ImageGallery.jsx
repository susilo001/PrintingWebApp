export default function ImageGallery({ images, alt }) {
  return (
    <>
      {images.length === 1 && (
        <div className="mx-auto mt-6 flex justify-center sm:px-6 ">
          <div className="overflow-hidden rounded-lg">
            <img
              srcSet={images[0]}
              alt={alt}
              className="aspect-square h-96 bg-base-200 object-contain"
            />
          </div>
        </div>
      )}
      {images.length === 2 && (
        <div className="mt-6 grid gap-y-4 sm:grid-cols-2 sm:gap-8">
          <div className="overflow-hidden rounded-lg sm:flex sm:justify-end">
            <img
              srcSet={images[0]}
              alt={alt}
              className="aspect-square h-96 bg-base-200 object-contain"
            />
          </div>
          <div className="overflow-hidden rounded-lg sm:flex sm:justify-start">
            <img
              srcSet={images[1]}
              alt={alt}
              className="aspect-square h-96 bg-base-200 object-contain"
            />
          </div>
        </div>
      )}
      {images.length === 3 && (
        <div className="mx-auto mt-6 grid gap-y-8 sm:grid-cols-3 sm:gap-8">
          <div className="overflow-hidden rounded-lg">
            <img
              srcSet={images[0]}
              alt={alt}
              className="aspect-square h-full bg-base-200 object-contain"
            />
          </div>
          <div className="hidden overflow-hidden rounded-lg sm:block">
            <img
              srcSet={images[1]}
              alt={alt}
              className="aspect-square h-full bg-base-200 object-contain"
            />
          </div>
          <div className="hidden overflow-hidden rounded-lg sm:block">
            <img
              srcSet={images[2]}
              alt={alt}
              className="aspect-square h-full bg-base-200 object-contain"
            />
          </div>
        </div>
      )}
      {images.length === 4 && (
        <div className="mx-auto mt-6 place-items-center sm:grid sm:grid-cols-3  sm:px-6">
          <div className="hidden h-96 overflow-hidden rounded-lg sm:block">
            <img
              srcSet={images[0]}
              alt={alt}
              className="h-full bg-base-200 object-contain"
            />
          </div>
          <div className="hidden h-96 sm:grid sm:grid-cols-1 sm:gap-y-8">
            <div className="overflow-hidden rounded-lg">
              <img
                srcSet={images[1]}
                alt={alt}
                className="aspect-square h-full bg-base-200 object-contain"
              />
            </div>
            <div className="overflow-hidden rounded-lg">
              <img
                srcSet={images[2]}
                alt={alt}
                className="aspect-square h-full bg-base-200 object-contain"
              />
            </div>
          </div>
          <div className="h-96 overflow-hidden lg:lg:sm:sm:rounded-lg">
            <img
              srcSet={images[3]}
              alt={alt}
              className="h-full bg-base-200 object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
