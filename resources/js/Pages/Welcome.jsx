import { Link, Head } from "@inertiajs/inertia-react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ExploreByCategory from "@/Components/ExploreByCategory";
import Card from "@/Components/Card";
import Testimonial from "@/Components/Testimonial";
import FeatureSection from "@/Components/FeatureSection";
import CurrencyFormater from "@/lib/CurrencyFormater";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Welcome({
  auth,
  errors,
  cartCount,
  categories,
  featuredProducts,
}) {
  return (
    <AuthenticatedLayout auth={auth} errors={errors} cartCount={cartCount}>
      <Head title="Welcome" />
      <div className="container mx-auto max-w-7xl px-4 my-12 sm:px-6 lg:px-8">
        <div className="hero bg-base-200">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <img
              src="https://picsum.photos/seed/picsum/200/300"
              className="max-w-sm rounded-lg shadow-2xl"
            />
            <div>
              <h1 className="text-5xl font-bold">Box Office News!</h1>
              <p className="py-6">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut
                assumenda excepturi exercitationem quasi. In deleniti eaque aut
                repudiandae et a id nisi.
              </p>
              <button className="btn btn-primary">Get Started</button>
            </div>
          </div>
        </div>
        <ExploreByCategory categories={categories} />
        <div className="max-w-7xl my-8">
          <div className="flex justify-center mb-8">
            <h2 className="text-2xl font-bold">Popular Products</h2>
          </div>

          <Swiper spaceBetween={20} slidesPerView={5} className={"swiper"}>
            {featuredProducts.map((product, index) => (
              <SwiperSlide key={index}>
                <Link href={route("product.show", product.id)}>
                  <Card className={"bg-base-200 h-96 card-compact shadow-md"}>
                    <Card.Image
                      src={product.image}
                      alt={product.name}
                      className="bg-cover h-52"
                    />
                    <Card.Body>
                      <Card.Title>{product.name}</Card.Title>
                      <span className="badge badge-sm badge-secondary">
                        {product.category.name}
                      </span>
                      <span>{CurrencyFormater(product.prices[0].price)}</span>
                    </Card.Body>
                  </Card>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="max-w-7xl my-8">
          <FeatureSection />
        </div>
        <div className="max-w-7xl my-8">
          <div className="flex justify-center mb-8">
            <h2 className="text-2xl font-bold">Testimonial</h2>
          </div>
          <Testimonial />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
