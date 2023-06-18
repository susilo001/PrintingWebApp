import Banner from "@/Components/Banner";
import Button from "@/Components/Button";
import Card from "@/Components/Card";
import FeatureSection from "@/Components/FeatureSection";
import SocialMediaLink from "@/Components/SocialMediaLink";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Currency from "@/utils/Currency";
import {
  ArrowRightIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { Head, Link } from "@inertiajs/react";
import { useMemo, useState } from "react";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const swiperBreakpoints = {
  320: { slidesPerView: 1 },
  640: { slidesPerView: 2 },
  768: { slidesPerView: 3 },
  1024: { slidesPerView: 4 },
  1280: { slidesPerView: 5 },
};

export default function Index({ products, testimonials }) {
  const [Products, setProducts] = useState(products);

  const featuredProducts = useMemo(() => {
    return products.filter((product) => product.featured === true);
  }, [products]);

  const categories = useMemo(() => {
    const data = products.map((product) => product.category);
    const unique = [...new Set(data.map((item) => item.id))];
    return unique.map((id) => {
      const category = data.find((item) => item.id === id);
      return {
        id,
        name: category.name,
        slug: category.slug,
      };
    });
  }, [products]);

  const getProductsByCategory = (id) => {
    const selectedCategory = products.filter(
      (product) => product.category.id === id
    );
    setProducts(selectedCategory);
  };

  const handleSearch = (e) => {
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setProducts(filteredProducts);
  };

  return (
    <AuthenticatedLayout
      header={
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">Orbit Trust</h1>
            <p>Offset & Digital Printing Services</p>
          </div>
          <SocialMediaLink />
        </div>
      }
    >
      <Head title="Offset & Digital Printing" />

      {/* Banner Section */}
      <Banner />

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
          breakpoints={swiperBreakpoints}
          modules={[Pagination]}
        >
          {featuredProducts.map((product, index) => (
            <SwiperSlide key={index}>
              <Link href={route("product.show", product.id)}>
                <Card>
                  <Card.Image srcSet={product.images[0]} alt={product.name} />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Actions className="flex items-center justify-between">
                      <span className="font-bold text-primary">
                        {Currency.getPrice(product.prices)}
                      </span>
                      <span className="badge badge-accent p-2 text-xs font-semibold">
                        {product.category.name}
                      </span>
                    </Card.Actions>
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
                {categories.map((category) => (
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
            <div className="grid h-screen grid-cols-2 gap-4 overflow-hidden overflow-y-auto pb-2 sm:scroll-smooth sm:pr-4 md:grid-cols-3 xl:grid-cols-4">
              {Products.map((product, index) => (
                <Link href={route("product.show", product.id)} key={index}>
                  <Card>
                    <Card.Image srcSet={product.images[0]} alt={product.name} />
                    <Card.Body>
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Actions className="flex items-center justify-between">
                        <span className="font-bold text-primary">
                          {Currency.getPrice(product.prices)}
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
        <div className="grid justify-center justify-items-center">
          <h2 className="text-2xl font-bold">Testimonial</h2>
          <p className="text-sm font-semibold text-gray-500">
            What our customers say about us
          </p> 
        </div>
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          modules={[Pagination]}
          pagination={{ clickable: true }}
        >
          {testimonials.map((item, index) => (
            <SwiperSlide
              key={index}
              className="swiper-slide mb-8 !bg-transparent"
            >
              <div className="mx-auto p-4 text-center md:w-2/4">
                <div className="flex space-x-4">
                  <div className="hidden sm:block sm:w-full">
                    <img
                      className="w-10/20 aspect-square rounded-xl bg-base-200 object-contain"
                      srcSet={item.product.images[0]}
                      sizes="(max-width: 674px) 100vw, 674px"
                      alt={item.product.name}
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-col justify-center space-y-4">
                    <p className="text-left">&quot;{item.testimonial}&quot;</p>
                    <div className="flex space-x-4">
                      <div className="avatar">
                        <div className="h-10 w-10 rounded-full">
                          <img
                            src="https://picsum.photos/200"
                            alt={item.user.name}
                            className="aspect-square rounded-full bg-base-200 object-cover"
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
