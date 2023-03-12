import Card from "@/Components/Card";
import FeatureSection from "@/Components/FeatureSection";
import Input from "@/Components/Input";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CurrencyFormater from "@/lib/CurrencyFormater";
import {
  ArrowRightIcon,
  CheckIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Welcome({ products, testimonials }) {
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
      <Head title="Welcome" />
      <div className="container mx-auto my-12 max-w-7xl space-y-16 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="flex flex-col space-y-6 py-10 lg:h-[32rem] lg:flex-row lg:items-center lg:py-16">
          <div className="w-full lg:w-1/2">
            <div className="lg:max-w-lg">
              <h1 className="text-3xl font-semibold tracking-wide lg:text-4xl">
                Print like a pro with our premium printing services.
              </h1>
              <p className="mt-4">
                From business cards to brochures, we&apos;ve got you covered.
                With state-of-the-art equipment, experienced technicians and a
                wide range of paper and ink options, we guarantee your print job
                will exceed your expectations. Trust us for your next project
                and experience the difference in quality.
              </p>
              <div className="my-8 grid gap-6 sm:grid-cols-2">
                <div className="flex items-center">
                  <CheckIcon className="h-5 w-6" />

                  <span className="mx-3">Premium selection</span>
                </div>

                <div className="-px-3 flex items-center ">
                  <CheckIcon className="h-5 w-6" />

                  <span className="mx-3">Insurance</span>
                </div>

                <div className="-px-3 flex items-center">
                  <CheckIcon className="h-5 w-6" />

                  <span className="mx-3">All legal documents</span>
                </div>

                <div className="-px-3 flex  items-center ">
                  <CheckIcon className="h-5 w-6" />

                  <span className="mx-3">From US glasses dealers</span>
                </div>

                <div className="-px-3 flex  items-center ">
                  <CheckIcon className="h-5 w-6" />

                  <span className="mx-3">Payment Security</span>
                </div>

                <div className="-px-3 flex  items-center ">
                  <CheckIcon className="h-5 w-6" />

                  <span className="mx-3">Fast shipping (+ Express)</span>
                </div>
              </div>
              <Link href="/design" as="button" className="btn-primary btn">
                Try Design Tool
              </Link>
            </div>
          </div>

          <div className="flex h-96 w-full items-center justify-center lg:w-1/2">
            <img
              className="aspect-square h-full w-full max-w-2xl rounded-md object-contain"
              src="../asset/hero-section.png"
              alt="Printing Services"
            />
          </div>
        </div>

        {/* Explore by Category */}
        <>
          <div className="mb-10 flex justify-center">
            <h2 className="text-2xl font-bold">Explore by Category</h2>
          </div>
          <div className="flex sm:space-x-8 flex-col sm:flex-row space-y-8">
            <div className="flex flex-col">
              <div className="flex-none">
                <div className="flex h-fit justify-center">
                  <Input
                    type={"text"}
                    placeholder={"Search"}
                    className={"input-bordered"}
                    handleChange={handleSearch}
                  />
                </div>
              </div>
              <div className="grow sm:border-r sm:border-primary-focus my-4">
                <div className="flex h-full flex-row flex-wrap items-center justify-center space-x-4 md:flex-col md:items-start md:justify-start md:space-x-0">
                  {getProductCategoryName().map((category) => (
                    <button
                      className="btn-ghost btn"
                      key={category.id}
                      onClick={() => getProductsByCategory(category.id)}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex-none">
                <div className="flex justify-center sm:justify-start">
                  <Link
                    href={route("product.index")}
                    as="button"
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
                className="grid gap-4 overflow-hidden overflow-y-auto pb-2 pr-4 sm:grid-cols-2 sm:scroll-smooth"
                style={{
                  height: "810px",
                }}
              >
                {Products.map((product, index) => (
                  <Link
                    href={route("product.show", product.id)}
                    key={index}
                    className="link-hover link"
                  >
                    <Card className="card-compact h-64 border shadow-lg hover:bg-base-200">
                      <Card.Image
                        src={product.images[0]}
                        className={"aspect-square object-contain"}
                        alt={product.name}
                      />
                      <Card.Body>
                        <Card.Title
                          className={
                            "flex items-center justify-between text-xl hover:font-bold"
                          }
                        >
                          <span>{product.name}</span>
                          <span className="text-primary">
                            {CurrencyFormater(product.price)}
                          </span>
                        </Card.Title>
                      </Card.Body>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </>

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
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 4,
              },
            }}
            modules={[Pagination]}
          >
            {getFeaturedProducts().map((product, index) => (
              <SwiperSlide key={index}>
                <Link href={route("product.show", product.id)}>
                  <Card
                    className={
                      "card-compact h-80 border shadow-xl hover:bg-base-200"
                    }
                  >
                    <Card.Image
                      src={product.images[0]}
                      alt={product.name}
                      className="aspect-square object-contain"
                    />
                    <Card.Body>
                      <Card.Title>{product.name}</Card.Title>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">
                          {CurrencyFormater(product.price)}
                        </span>
                        <span className="badge badge-accent p-2 font-semibold">
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

        {/* Feature Section */}
        <FeatureSection />

        {/* Testimonial */}
        <>
          <div className="mb-10 flex justify-center">
            <h2 className="text-2xl font-bold">Testimonial</h2>
          </div>
          <Swiper spaceBetween={50} slidesPerView={1} className={"swiper"}>
            <div className="swiper-wrapper">
              {testimonials.map((item, index) => (
                <SwiperSlide
                  key={index}
                  className="swiper-slide !bg-transparent"
                >
                  <div className="mx-auto text-center md:w-8/12 lg:w-7/12">
                    <div className="flex space-x-8">
                      <div className="w-full">
                        <img
                          className="rounded-xl"
                          src="https://picsum.photos/200"
                          alt="company logo"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex flex-col justify-center space-y-4">
                        <p className="text-left">
                          &quot;{item.testimonial}&quot;
                        </p>
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
                          <div className="flex flex-col justify-start items-start">
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
            </div>

            <div className="swiper-pagination" />
          </Swiper>
        </>
      </div>
    </AuthenticatedLayout>
  );
}
