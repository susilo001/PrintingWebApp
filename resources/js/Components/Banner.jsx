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
      className="swiper w-full"
    >
      {banners.map((item, index) => (
        <SwiperSlide key={index}>
          <Link href={item.url}>
            <img
              srcSet={item.image}
              sizes="(max-width: 674px) 100vw, 674px"
              alt={item.description}
              className="object-cover w-full aspect-[18/7] rounded-lg"
              width={674}
              height={252}
            />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
