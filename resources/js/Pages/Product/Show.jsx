import Button from "@/Components/Button";
import Container from "@/Components/Container";
import FilepondComponent from "@/Components/Filepond";
import ImageGallery from "@/Components/ImageGallery";
import Input from "@/Components/Input";
import TextArea from "@/Components/TextArea";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CurrencyFormater from "@/utils/CurrencyFormater";
import {
  ChevronRightIcon,
  ShoppingBagIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import { Head, Link, router } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Product({ product }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [design, setDesign] = useState([]);
  const [variants, setVariants] = useState([]);
  const [templates, setTemplates] = useState([]);

  const descriptionInput = useRef();
  const quantityInput = useRef();
  const designInput = useRef();

  const getTemplates = async () => {
    const response = await fetch("/api/design");
    const data = await response.json();
    setTemplates(data.templates);
  };

  useEffect(() => {
    getTemplates();
  }, []);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

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
    formData.append("description", description);
    formData.append("quantity", quantity);
    formData.append("design", design[0].file);
    formData.append("variants", JSON.stringify(variants));

    Swal.fire({
      title: "Are you sure?",
      text: "You want to add this product to your cart?",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        router.post("/cart", formData, {
          onError: () => {
            if (errors.quantity) {
              reset("quantity");
              quantityInput.current.focus();
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
                  <Link href={route("product.index")}>
                    <span className="mr-2 text-sm font-medium">
                      {product.category.name}
                    </span>
                  </Link>
                  <ChevronRightIcon className="h-5 w-5" />
                </div>
                <span className="font-medium hover:text-gray-600">
                  {product.name}
                </span>
              </div>
            </nav>
          </div>
        </div>
      }
    >
      <Head title={product.name} />

      <Container>
        <div className="pt-6">
          {/* Image gallery */}
          <ImageGallery images={product.images} alt={product.name} />

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
                {CurrencyFormater(product.prices[0].price)}
                <span className="badge badge-secondary ml-2">
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
                  <div key={variant.id} className="mt-2">
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">{variant.name}</span>
                        <span className="label-text-alt">
                          {variant.name} guide
                        </span>
                      </label>
                      <select
                        name={variant.name}
                        value={variants[variant.id]}
                        onChange={(e) =>
                          handleVariantChange(variant.name, e.target.value)
                        }
                        className="select-bordered select"
                      >
                        {variant.options.map((option) => (
                          <option key={option.value}>{option.value}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}

                {/* FileUpload */}
                <div className="mt-10">
                  <FilepondComponent
                    name="design"
                    files={design}
                    onUpdateFiles={setDesign}
                  />
                </div>

                <Button
                  name="addToCart"
                  type="submit"
                  className="btn-primary mt-8 w-full gap-2"
                >
                  Add to Cart
                  <ShoppingBagIcon className="h-6 w-6" />
                </Button>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r  lg:pt-6 lg:pb-16 lg:pr-8">
              {/* Description and details */}
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base ">{product.description}</p>
              </div>
              {/* Table Prices */}
              <div className="mt-8 overflow-x-auto border-t pt-4">
                <table className="table-zebra table w-full">
                  <thead>
                    <tr>
                      <th>Price</th>
                      <th>Min Order</th>
                      <th>Max Order</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.prices.map((price) => (
                      <tr key={price.id}>
                        <td>{CurrencyFormater(price.price)}</td>
                        <td>{price.min_order}</td>
                        <td>{price.max_order}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="divider-dashed divider my-4" />

              {/* Design Templates */}
              <div className="mt-8 space-y-4 overflow-x-auto rounded-lg bg-base-200 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Design Templates</h3>
                  <Link href="/designs">
                    <span className="text-sm font-medium text-secondary hover:text-secondary-focus">
                      View all
                    </span>
                  </Link>
                </div>
                {templates.length === 0 ? (
                  <div className="flex items-center justify-center">
                    <p className="text-center">No templates available</p>
                  </div>
                ) : (
                  <Swiper
                    slidesPerView={4}
                    spaceBetween={10}
                    className="rounded-lg bg-base-100 p-4"
                  >
                    {templates.map((design) => (
                      <SwiperSlide key={design.id}>
                        <Link href={route("design.show", design.id)}>
                          <div className="flex flex-col items-center justify-center">
                            <img src={design.image} alt="" />
                            <p className="text-center">{design.name}</p>
                          </div>
                        </Link>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </AuthenticatedLayout>
  );
}
