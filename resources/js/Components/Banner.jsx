import { Link, usePage } from "@inertiajs/react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
export default function Banner() {
  const { banners } = usePage().props;

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      className="swiper mt-20 w-full"
    >
      {banners.map((item, index) => (
        <SwiperSlide key={index}>
          <Link href={item.url}>
            <img
              srcSet={item.image}
              alt={item.description}
              className="h-[20rem] w-full object-cover lg:h-[32rem]"
            />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
