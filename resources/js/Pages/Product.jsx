import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/inertia-react";
import { useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import Filepond from "@/Components/Filepond";
import CurrencyFormater from "@/lib/CurrencyFormater";
import { Inertia } from "@inertiajs/inertia";
import Input from "@/Components/Input";
import TextArea from "@/Components/TextArea";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Product(props) {
  const product = {
    name: props.product.name,
    price: props.product.prices[0].price,
    href: "#",
    breadcrumb: {
      id: 1,
      name: props.product.category.name,
      href: "#",
    },
    images: [
      {
        src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
        alt: "Two each of gray, white, and black shirts laying flat.",
      },
      {
        src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
        alt: "Model wearing plain black basic tee.",
      },
      {
        src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
        alt: "Model wearing plain gray basic tee.",
      },
      {
        src: "https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
        alt: "Model wearing plain white basic tee.",
      },
    ],
    variants: props.product.variants,
    description: props.product.description,
    highlights: JSON.parse(props.product.highlights),
    details: props.product.details,
  };

  const reviews = { href: "#", average: 4, totalCount: 117 };

  const handleSubmit = (e) => {
    e.preventDefault();

    let selectedVariant = [];

    product.variants.forEach((variant) => {
      e.target[variant.name]?.value;

      selectedVariant.push({
        name: variant.name,
        value: e.target[variant.name]?.value,
      });
    });

    Inertia.post("/cart", {
      product_id: props.product.id,
      project_name: e.target.project_name.value,
      description: e.target.description.value,
      quantity: e.target.qty.value,
      variants: selectedVariant,
      design: e.target.design.files[0],
    });
  };
  return (
    <AuthenticatedLayout auth={props.auth} errors={props.errors}>
      <Head title="Product" />

      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-10">
        <div>
          <div className="pt-6">
            <nav aria-label="Breadcrumb">
              <div className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="flex items-center">
                  <a
                    href={product.breadcrumb.href}
                    className="mr-2 text-sm font-medium"
                  >
                    {product.breadcrumb.name}
                  </a>
                  <svg
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="h-5 w-4 "
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
                <a
                  href={props.product.href}
                  aria-current="page"
                  className="font-medium hover:text-gray-600"
                >
                  {props.product.name}
                </a>
              </div>
            </nav>

            {/* Image gallery */}
            <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
              <div className="aspect-w-3 aspect-h-4 hidden overflow-hidden rounded-lg lg:block">
                <img
                  src={product.images[0].src}
                  alt={product.images[0].alt}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
                  <img
                    src={product.images[1].src}
                    alt={product.images[1].alt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
                  <img
                    src={product.images[2].src}
                    alt={product.images[2].alt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </div>
              <div className="aspect-w-4 aspect-h-5 sm:overflow-hidden sm:rounded-lg lg:aspect-w-3 lg:aspect-h-4">
                <img
                  src={product.images[3].src}
                  alt={product.images[3].alt}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>

            {/* Product info */}
            <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
              <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {props.product.name}
                </h1>
              </div>

              {/* Options */}
              <div className="mt-4 lg:row-span-3 lg:mt-0">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl tracking-tight">
                  {CurrencyFormater(product.price)}{" "}
                  <span className="text-sm badge">/ Starting Price</span>
                </p>

                {/* Reviews */}
                <div className="mt-6">
                  <h3 className="sr-only">Reviews</h3>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            reviews.average > rating
                              ? "text-accent"
                              : "text-base-content",
                            "h-5 w-5 flex-shrink-0"
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="sr-only">{reviews.average} out of 5 stars</p>
                    <a
                      href={reviews.href}
                      className="ml-3 text-sm font-medium text-secondary hover:text-secondary-focus"
                    >
                      {reviews.totalCount} reviews
                    </a>
                  </div>
                </div>

                <form className="mt-10" onSubmit={handleSubmit}>
                  <Input
                    name="project_name"
                    label={"Project Name"}
                    type="text"
                    className={"input-bordered w-full"}
                  />

                  <TextArea
                    name="description"
                    label={"Description"}
                    className={"textarea-bordered"}
                  />

                  <Input
                    name="qty"
                    label={"Quantity"}
                    type="number"
                    className={"input-bordered w-full"}
                  />

                  {/* Variants */}
                  {product.variants.map((variant) => (
                    <div key={variant.id} className="mt-10">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium">{variant.name}</h3>
                        <a
                          href="#"
                          className="text-sm font-medium text-secondary hover:text-secondary-focus"
                        >
                          {variant.name} guide
                        </a>
                      </div>

                      <RadioGroup
                        name={variant.name}
                        defaultValue={variant.options[0]}
                        className="mt-4"
                      >
                        <RadioGroup.Label className="sr-only">
                          {" "}
                          Choose a {variant.name}{" "}
                        </RadioGroup.Label>
                        <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                          {variant.options.map((option) => (
                            <RadioGroup.Option
                              key={option.id}
                              value={option.value}
                              className={({ active }) =>
                                classNames(
                                  "bg-neutral-content shadow-sm text-gray-900 cursor-pointer",
                                  active ? "ring-2 ring-accent-focus" : "",
                                  "group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                                )
                              }
                            >
                              {({ active, checked }) => (
                                <>
                                  <RadioGroup.Label as="span">
                                    {option.value}
                                  </RadioGroup.Label>
                                  <span
                                    className={classNames(
                                      active ? "border" : "border-2",
                                      checked
                                        ? "border-accent"
                                        : "border-transparent",
                                      "pointer-events-none absolute -inset-px rounded-md"
                                    )}
                                    aria-hidden="true"
                                  />
                                </>
                              )}
                            </RadioGroup.Option>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>
                  ))}

                  {/* FileUpload */}
                  <div className="mt-10">
                    {/* <Filepond name={"filepond"} maxFiles={1} /> */}

                    <Input
                      name={"design"}
                      type={"file"}
                      label="File Upload"
                      className={"file-input file-input-bordered"}
                    />
                  </div>

                  <button
                    name="addToCart"
                    type="submit"
                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Add to Cart
                  </button>
                </form>
              </div>

              <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
                {/* Description and details */}
                <div>
                  <h3 className="sr-only">Description</h3>

                  <div className="space-y-6">
                    <p className="text-base ">{product.description}</p>
                  </div>
                </div>

                <div className="mt-10">
                  <h3 className="text-sm font-medium ">Highlights</h3>

                  <div className="mt-4">
                    <ul
                      role="list"
                      className="list-disc space-y-2 pl-4 text-sm"
                    >
                      {product.highlights.map((highlight) => (
                        <li key={highlight}>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-10">
                  <h2 className="text-sm font-medium ">Details</h2>

                  <div className="mt-4 space-y-6">
                    <p className="text-sm ">{product.details}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
