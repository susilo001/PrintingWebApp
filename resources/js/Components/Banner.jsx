import { Link } from "@inertiajs/react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
export default function Banner() {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      className="swiper mt-20 w-full lg:h-[32rem] h-[20rem]"
    >
      {carousel.map((item, index) => (
        <SwiperSlide key={index}>
          <Link href={item.url}>
            <img src={item.img} alt={item.alt} className="w-full" />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

const carousel = [
  {
    img: "https://picsum.photos/1000",
    alt: "This Alternative Descriptions",
    url: '#'
  },
  {
    img: "https://picsum.photos/1000",
    alt: "This Alternative Descriptions",
    url: '#'
  },
  {
    img: "https://picsum.photos/1000",
    alt: "This Alternative Descriptions",
    url: '#'
  },
  {
    img: "https://picsum.photos/1000",
    alt: "This Alternative Descriptions",
    url: '#'
  },
];
