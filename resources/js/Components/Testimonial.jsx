import { Swiper, SwiperSlide } from "swiper/react";

const Testimonial = ({ testimonials }) => {
  console.log(testimonials);
  return (
    <Swiper spaceBetween={50} slidesPerView={1} className={"swiper"}>
      <div className="swiper-wrapper">
        {testimonials.map((item, index) => (
          <SwiperSlide key={index} className="swiper-slide !bg-transparent">
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
                    <span className="font-serif">"</span>
                    {item.testimonial}
                    <span className="font-serif">"</span>
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
                    <div>
                      <h3 className="text-left text-lg font-semibold leading-none">
                        {item.user.name}
                      </h3>
                      <span className="text-xs ">{item.user.email}</span>
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
  );
};

export default Testimonial;
