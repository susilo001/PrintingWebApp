import Bannner from "@/Components/Banner";
import Button from "@/Components/Button";
import Card from "@/Components/Card";
import FeatureSection from "@/Components/FeatureSection";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CurrencyFormater from "@/utils/CurrencyFormater";
import {
  ArrowRightIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Index({ products, testimonials }) {
  const [Products, setProducts] = useState(products);

  const getFeaturedProducts = () => {
    return products.filter((product) => product.featured === true);
  };

  const getProductCategoryName = () => {
    const data = products.map((product) => product.category);

    const unique = [...new Set(data.map((item) => item.id))];
    const categories = unique.map((id) => {
      return {
        id,
        name: data.find((item) => item.id === id).name,
        slug: data.find((item) => item.id === id).slug,
      };
    });

    return categories;
  };

  const getProductsByCategory = (id) => {
    const selectedCategory = products.filter(
      (product) => product.category.id === id
    );

    setProducts(selectedCategory);
  };

  const handleSearch = (e) => {
    const filteredProducts = [];
    products.forEach((product) => {
      if (product.name.toLowerCase().includes(e.target.value.toLowerCase())) {
        filteredProducts.push(product);
      }
    });

    setProducts(filteredProducts);
  };
  return (
    <AuthenticatedLayout>
      <Head title="Offset & Digital Printing" />
      {/* Banner Section */}
      <Bannner />

      {/* Feature Section */}
      <FeatureSection />

      {/* Featured Product */}
      <>
        <div className="mb-10 flex justify-center">
          <h2 className="text-2xl font-bold">Popular Products</h2>
        </div>
        <Swiper
          spaceBetween={20}
          className={"swiper py-4"}
          pagination={{
            type: "progressbar",
          }}
          breakpoints={{
            400: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          modules={[Pagination]}
        >
          {getFeaturedProducts().map((product, index) => (
            <SwiperSlide key={index}>
              <Link href={route("product.show", product.id)}>
                <Card className={"h-80"}>
                  <Card.Image srcSet={product.images[0]} alt={product.name} />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-primary">
                        {CurrencyFormater(product.price)}
                      </span>
                      <span className="badge badge-accent p-2 text-xs font-semibold">
                        {product.category.name}
                      </span>
                    </div>
                  </Card.Body>
                </Card>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </>

      {/* Explore by Category */}
      <>
        <div className="mb-10 flex justify-center">
          <h2 className="text-2xl font-bold">Explore by Category</h2>
        </div>
        <div className="flex flex-col space-y-8 sm:space-y-0 md:space-x-8 lg:flex-row">
          <div className="mb-8 flex flex-col lg:mb-0">
            <div className="flex-none">
              <div className="flex h-fit justify-center">
                <input
                  type="text"
                  placeholder="Search Here"
                  className="input-bordered input lg:w-full"
                  onChange={handleSearch}
                />
              </div>
            </div>
            <div className="my-4 grow lg:border-r lg:border-primary-focus">
              <div className="flex h-full flex-row flex-wrap items-center justify-center space-x-4 lg:flex-col lg:items-start lg:justify-start lg:space-x-0">
                {getProductCategoryName().map((category) => (
                  <Button
                    className="btn-ghost lg:btn-wide lg:justify-start"
                    type="button"
                    key={category.id}
                    onClick={() => getProductsByCategory(category.id)}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex-none">
              <div className="flex justify-center lg:justify-start">
                <Link
                  href={route("product.index")}
                  className="btn-primary btn-wide btn h-fit gap-2"
                >
                  Explore More
                  <ArrowRightIcon className={"h-5 w-5"} />
                </Link>
              </div>
            </div>
          </div>
          <div className="grow">
            {Products.length === 0 && (
              <div className="flex h-full items-center justify-center space-x-4 rounded border border-error p-8">
                <ExclamationTriangleIcon className={"h-6 w-6 text-error"} />
                <h2 className="text-xl font-bold text-error md:text-2xl">
                  Product Not Found
                </h2>
              </div>
            )}
            <div
              className="grid gap-4 overflow-hidden overflow-y-auto pb-2 sm:pr-4 sm:grid-cols-2 sm:scroll-smooth xl:grid-cols-3"
              style={{
                height: "910px",
              }}
            >
              {Products.map((product, index) => (
                <Link href={route("product.show", product.id)} key={index}>
                  <Card className="h-72">
                    <Card.Image srcSet={product.images[0]} alt={product.name} />
                    <Card.Body>
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Actions className="flex items-center justify-between">
                        <span className="font-bold text-primary">
                          {CurrencyFormater(product.price)}
                        </span>
                        <span className="badge badge-accent p-2 text-xs font-semibold">
                          {product.category.name}
                        </span>
                      </Card.Actions>
                    </Card.Body>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </>

      {/* Testimonial */}
      <>
        <div className="mb-10 flex justify-center">
          <h2 className="text-2xl font-bold">Testimonial</h2>
        </div>
        <Swiper spaceBetween={50} slidesPerView={1} modules={[Pagination]} pagination={{ clickable: true }}>
          {testimonials.map((item, index) => (
            <SwiperSlide key={index} className="swiper-slide !bg-transparent">
              <div className="mx-auto p-4 text-center md:w-8/12 lg:w-7/12">
                <div className="flex space-x-8">
                  <div className="w-full">
                    <img
                      className="rounded-xl aspect-square object-contain bg-base-200"
                      srcSet={item.product.images[0]}
                      alt={item.product.name}
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-col justify-center space-y-4">
                    <p className="text-left">&quot;{item.testimonial}&quot;</p>
                    <div className="flex space-x-4 pl-4">
                      <div className="avatar">
                        <div className="h-10 w-10 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                          <img
                            src="https://picsum.photos/200"
                            alt={item.user.name}
                            loading="lazy"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col items-start justify-start">
                        <h3 className="text-left text-lg font-semibold leading-none">
                          {item.user.name}
                        </h3>
                        <span className="text-xs">{item.user.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    </AuthenticatedLayout>
  );
}
