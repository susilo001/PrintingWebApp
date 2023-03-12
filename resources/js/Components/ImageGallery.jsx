export default function ImageGallery({ images, alt }) {
  return (
    <>
      {images.length === 1 && (
        <div className="mx-auto mt-6 sm:px-6 flex justify-center ">
          <div className="rounded-lg overflow-hidden">
            <img
              src={images[0]}
              alt={alt}
              className="aspect-square object-contain bg-base-200 h-96"
            />
          </div>
        </div>
      )}
      {images.length === 2 && (
        <div className="mt-6 grid gap-y-4 sm:grid-cols-2 sm:gap-8">
          <div className="rounded-lg sm:flex sm:justify-end overflow-hidden">
            <img
              src={images[0]}
              alt={alt}
              className="object-contain bg-base-200 aspect-square h-96"
            />
          </div>
          <div className="rounded-lg sm:flex sm:justify-start overflow-hidden">
            <img
              src={images[1]}
              alt={alt}
              className="object-contain bg-base-200 aspect-square h-96"
            />
          </div>
        </div>
      )}
      {images.length === 3 && (
        <div className="mx-auto mt-6 grid gap-y-8 sm:grid-cols-3 sm:gap-8">
          <div className="rounded-lg overflow-hidden">
            <img
              src={images[0]}
              alt={alt}
              className="object-contain bg-base-200 aspect-square h-full"
            />
          </div>
          <div className="rounded-lg overflow-hidden hidden sm:block">
            <img
              src={images[1]}
              alt={alt}
              className="object-contain bg-base-200 aspect-square h-full"
            />
          </div>
          <div className="rounded-lg overflow-hidden hidden sm:block">
            <img
              src={images[2]}
              alt={alt}
              className="object-contain bg-base-200 aspect-square h-full"
            />
          </div>
        </div>
      )}
      {images.length === 4 && (
        <div className="mx-auto mt-6 sm:px-6 sm:grid sm:grid-cols-3  place-items-center">
          <div className="hidden rounded-lg sm:block overflow-hidden h-96">
            <img
              src={images[0]}
              alt={alt}
              className="object-contain bg-base-200 h-full"
            />
          </div>
          <div className="hidden sm:grid sm:grid-cols-1 sm:gap-y-8 h-96">
            <div className="rounded-lg overflow-hidden">
              <img
                src={images[1]}
                alt={alt}
                className="object-contain bg-base-200 aspect-square h-full"
              />
            </div>
            <div className="rounded-lg overflow-hidden">
              <img
                src={images[2]}
                alt={alt}
                className="object-contain bg-base-200 aspect-square h-full"
              />
            </div>
          </div>
          <div className="lg:lg:sm:sm:rounded-lg overflow-hidden h-96">
            <img
              src={images[3]}
              alt={alt}
              className="object-contain bg-base-200 h-full"
            />
          </div>
        </div>
      )}
    </>
  );
}
