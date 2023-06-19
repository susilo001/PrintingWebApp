import Button from "@/Components/Button";
import FilepondComponent from "@/Components/Filepond";
import ImageGallery from "@/Components/ImageGallery";
import Input from "@/Components/Input";
import TextArea from "@/Components/TextArea";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Currency from '@/utils/Currency';
import {
  ChevronRightIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";
import { Head, Link, router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Product({ product }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [design, setDesign] = useState([]);
  const [variants, setVariants] = useState([]);
  const [templates, setTemplates] = useState([]);

  const getTemplates = async () => {
    const response = await fetch("/api/design");
    const data = await response.json();
    setTemplates(data.templates);
  };

  useEffect(() => {
    getTemplates();
  }, []);

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
            Swal.fire({
              title: "Error",
              text: "Something went wrong. Please try again.",
              icon: "error",
            });
          },
        });
      }
    });
  };

  return (
    <AuthenticatedLayout
      header={
        <div className="flex items-center">
          <div>
            <h1 className="sm:text-2xl text-lg font-bold">{product.name}</h1>
            <p className="text-gray-500">View product details</p>
          </div>
        </div>
      }
    >
      <Head title={product.name} />

      <div>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb">
          <div className="flex max-w-2xl items-center space-x-2 lg:max-w-7xl">
            <div className="flex items-center">
              <Link className="link link-hover" href={route("product.index")}>
                <span className="mr-2 text-xs sm:text-sm font-semibold">
                  {product.category.name}
                </span>
              </Link>
              <ChevronRightIcon className="h-5 w-5" />
            </div>
            <span className="mr-2 text-xs sm:text-sm font-medium">
              {product.name}
            </span>
          </div>
        </nav>

        {/* Image gallery */}
        <ImageGallery images={product.images} alt={product.name} />

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h2 className="text-lg font-bold tracking-tight sm:text-3xl">
              {product.name}
            </h2>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="sm:text-3xl text-lg tracking-tight">
              {Currency.getPrice(product.prices)}
              <span className="badge badge-primary badge-outline ml-2 font-medium">
                / Starting Price
              </span>
            </p>

            <form className="mt-8" onSubmit={handleSubmit}>
              <TextArea
                id="description"
                name="description"
                label="Description"
                className={"textarea-bordered"}
                required
                value={description}
                handleChange={(e) => setDescription(e.target.value)}
              />

              <Input
                id="quantity"
                name="quantity"
                label="Quantity"
                className={"input-bordered w-full"}
                required
                value={quantity}
                handleChange={(e) => setQuantity(e.target.value)}
                type="number"
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
              <div className="mt-8">
                <FilepondComponent
                  name="design"
                  files={design}
                  onUpdateFiles={setDesign}
                />
              </div>

              <Button
                name="addToCart"
                type="submit"
                className="btn-primary mt-8 w-full gap-2 text-white"
              >
                Add to Cart
                <ShoppingBagIcon className="h-6 w-6" />
              </Button>
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r  lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <h3 className="sr-only">Description</h3>

            <div className="space-y-6">
              <p className="text-base">{product.description}</p>
            </div>
            {/* Table Prices */}
            <div className="mt-8 overflow-x-auto border-t pt-4">
              <table className="table-zebra table w-full">
                <thead className="font-bold text-base-content">
                  <tr>
                    <th>Price</th>
                    <th>Min Order</th>
                    <th>Max Order</th>
                  </tr>
                </thead>
                <tbody>
                  {product.prices.map((price) => (
                    <tr key={price.id}>
                      <td className="font-semibold">{Currency.getCurrencyFormat(price.price)}</td>
                      <td>{price.min_order}</td>
                      <td>{price.max_order}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="divider-dashed divider my-4" />

            {/* Design Templates */}
            <div className="mt-8 space-y-4 overflow-x-auto rounded-lg">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Design Templates</h3>
                <Link href="/designs" className="text-sm font-medium text-primary hover:text-primary-focus">
                  View all
                </Link>
              </div>
              {templates.length === 0 ? (
                <div className="flex items-center justify-center bg-base-200 h-20 rounded-lg">
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
    </AuthenticatedLayout>
  );
}
