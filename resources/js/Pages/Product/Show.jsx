import ImageGallery from "@/Components/ImageGallery";
import Input from "@/Components/Input";
import TextArea from "@/Components/TextArea";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CurrencyFormater from "@/lib/CurrencyFormater";
import { RadioGroup } from "@headlessui/react";
import { ShoppingBagIcon, StarIcon } from "@heroicons/react/20/solid";
import { Head, router } from "@inertiajs/react";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import { useRef, useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import Swal from "sweetalert2";

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginImageTransform,
  FilePondPluginFileEncode
);

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Product({ product }) {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [design, setDesign] = useState("");
  const [variants, setVariants] = useState([]);

  const projectNameInput = useRef();
  const descriptionInput = useRef();
  const quantityInput = useRef();
  const designInput = useRef();

  const reviews = { href: "#", average: 4, totalCount: 117 };

  const handleVariantChange = (name, value) => {
    const variantExist = variants.find((variant) => variant.name === name);

    if (variantExist) {
      const variants = variants.map((variant) => {
        if (variant.name === name) {
          variant.value = value;
        }
        return variant;
      });

      setVariants(variants);
    } else {
      variants.push({
        name: name,
        value: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("product_id", product.id);
    formData.append("project_name", projectName);
    formData.append("description", description);
    formData.append("quantity", quantity);
    formData.append("design", design);
    formData.append("variants", JSON.stringify(variants));

    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        router.post("/cart", formData, {
          onError: () => {
            if (errors.quantity) {
              reset("quantity");
              quantityInput.current.focus();
            }

            if (errors.project_name) {
              reset("project_name");
              projectNameInput.current.focus();
            }

            if (errors.description) {
              reset("description");
              descriptionInput.current.focus();
            }

            if (errors.design) {
              reset("design");
              designInput.current.focus();
            }
          },
          onSuccess: () => {
            Swal.fire("Added!", "Your product has been added.", "success");
          },
        });
      }
    });
  };

  return (
    <AuthenticatedLayout
      header={
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-gray-500">View product details</p>
          </div>
          <div className="flex items-center space-x-2">
            <nav aria-label="Breadcrumb">
              <div className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="flex items-center">
                  <a href={"#"} className="mr-2 text-sm font-medium">
                    {product.category.name}
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
                  href={"#"}
                  aria-current="page"
                  className="font-medium hover:text-gray-600"
                >
                  {product.name}
                </a>
              </div>
            </nav>
          </div>
        </div>
      }
    >
      <Head title={product.name} />

      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div>
          <div className="pt-6">
            {/* Image gallery */}
            <ImageGallery images={product.images} />

            {/* Product info */}
            <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
              <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {product.name}
                </h1>
              </div>

              {/* Options */}
              <div className="mt-4 lg:row-span-3 lg:mt-0">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl tracking-tight">
                  {CurrencyFormater(product.prices[0].price)}{" "}
                  <span className="badge-secondary badge">
                    / Starting Price
                  </span>
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
                    required
                    value={projectName}
                    handleChange={(e) => setProjectName(e.target.value)}
                    className={"input-bordered w-full"}
                  />

                  <TextArea
                    name="description"
                    label={"Description"}
                    className={"textarea-bordered"}
                    required
                    value={description}
                    handleChange={(e) => setDescription(e.target.value)}
                  />

                  <Input
                    name="qty"
                    label={"Quantity"}
                    required
                    value={quantity}
                    handleChange={(e) => setQuantity(e.target.value)}
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
                        value={variants[variant.id]}
                        onChange={(value) =>
                          handleVariantChange(variant.name, value)
                        }
                        className="mt-4"
                      >
                        <RadioGroup.Label className="sr-only">
                          Choose a {variant.name}{" "}
                        </RadioGroup.Label>
                        <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                          {variant.options.map((option) => (
                            <RadioGroup.Option
                              key={option.value}
                              value={option.value}
                              className={({ active }) =>
                                classNames(
                                  "cursor-pointer bg-white text-gray-900 shadow-sm",
                                  active ? "ring-2 ring-accent-focus" : "",
                                  "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
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
                    <FilePond
                      name="filepond"
                      files={design}
                      storeAsFile={true}
                      onupdatefiles={(fileItems) => {
                        setDesign(fileItems[0].file);
                      }}
                    />
                  </div>

                  <button
                    name="addToCart"
                    type="submit"
                    className="btn-primary btn mt-8 w-full gap-2"
                  >
                    Add to Cart
                    <ShoppingBagIcon className="h-6 w-6" />
                  </button>
                </form>
              </div>

              <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r  lg:pt-6 lg:pb-16 lg:pr-8">
                {/* Description and details */}
                <div>
                  <h3 className="sr-only">Description</h3>

                  <div className="space-y-6">
                    <p className="text-base ">{product.description}</p>
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
