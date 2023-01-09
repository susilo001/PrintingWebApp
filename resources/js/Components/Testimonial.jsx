import { Swiper, SwiperSlide } from "swiper/react";

const Testimonial = () => {
    return (
        <Swiper spaceBetween={50} slidesPerView={1} className={"swiper"}>
            <div className="swiper-wrapper">
                {testimonial.map((item, index) => (
                    <SwiperSlide
                        key={index}
                        className="swiper-slide !bg-transparent"
                    >
                        <div className="mx-auto text-center md:w-8/12 lg:w-7/12">
                            <div className="flex space-x-8">
                                <div className="w-full">
                                    <img
                                        className="rounded-xl"
                                        src={item.companyLogo}
                                        alt="company logo"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="space-y-4 flex flex-col justify-center">
                                    <p className="text-left">
                                        <span className="font-serif">"</span>
                                        {item.testimonial}
                                        <span className="font-serif">"</span>
                                    </p>
                                    <div className="flex space-x-4 pl-4">
                                        <div className="avatar">
                                            <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                                <img
                                                    src={item.img}
                                                    alt="user avatar"
                                                    loading="lazy"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <h6 className="text-lg text-left font-semibold leading-none">
                                                {item.name}
                                            </h6>
                                            <span className="text-xs ">
                                                {item.designation}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </div>

            <div className="swiper-pagination"></div>
        </Swiper>
    );
};

const testimonial = [
    {
        img: "https://picsum.photos/200",
        name: "John Doe",
        designation: "Product Designer",
        companyLogo: "https://picsum.photos/200",
        testimonial:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat repellat perspiciatis excepturi est. Non ipsum iusto aliquam consequatur repellat provident, omnis ut, sapiente voluptates veritatis cum deleniti repudiandae ad doloribus.",
    },
    {
        img: "https://picsum.photos/200",
        name: "John Doe",
        designation: "Product Designer",
        companyLogo: "https://picsum.photos/200",
        testimonial:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat repellat perspiciatis excepturi est. Non ipsum iusto aliquam consequatur repellat provident, omnis ut, sapiente voluptates veritatis cum deleniti repudiandae ad doloribus.",
    },
    {
        img: "https://picsum.photos/200",
        name: "John Doe",
        designation: "Product Designer",
        companyLogo: "https://picsum.photos/200",
        testimonial:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat repellat perspiciatis excepturi est. Non ipsum iusto aliquam consequatur repellat provident, omnis ut, sapiente voluptates veritatis cum deleniti repudiandae ad doloribus.",
    },
    {
        img: "https://picsum.photos/200",
        name: "John Doe",
        designation: "Product Designer",
        companyLogo: "https://picsum.photos/200",
        testimonial:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat repellat perspiciatis excepturi est. Non ipsum iusto aliquam consequatur repellat provident, omnis ut, sapiente voluptates veritatis cum deleniti repudiandae ad doloribus.",
    },
    {
        img: "https://picsum.photos/200",
        name: "John Doe",
        designation: "Product Designer",
        companyLogo: "https://picsum.photos/200",
        testimonial:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat repellat perspiciatis excepturi est. Non ipsum iusto aliquam consequatur repellat provident, omnis ut, sapiente voluptates veritatis cum deleniti repudiandae ad doloribus.",
    },
];

export default Testimonial;
