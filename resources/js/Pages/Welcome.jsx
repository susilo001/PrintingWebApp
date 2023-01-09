import { Link, Head } from "@inertiajs/inertia-react";
import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ExploreByCategory from "@/Components/ExploreByCategory";
import Carousel from "@/Components/Carousel";
import Card from "@/Components/Card";
import Testimonial from "@/Components/Testimonial";
import FeatureSection from "@/Components/FeatureSection";

export default function Welcome(props) {
    return (
        <AuthenticatedLayout auth={props.auth} errors={props.errors}>
            <Head title="Welcome" />
            <div className="container mx-auto max-w-7xl px-4 my-12 sm:px-6 lg:px-8">
                <div className="hero bg-base-200">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <img
                            src="https://picsum.photos/seed/picsum/200/300"
                            className="max-w-sm rounded-lg shadow-2xl"
                        />
                        <div>
                            <h1 className="text-5xl font-bold">
                                Box Office News!
                            </h1>
                            <p className="py-6">
                                Provident cupiditate voluptatem et in. Quaerat
                                fugiat ut assumenda excepturi exercitationem
                                quasi. In deleniti eaque aut repudiandae et a id
                                nisi.
                            </p>
                            <button className="btn btn-primary">
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
                <ExploreByCategory />
                <div className="max-w-7xl my-8">
                    <div className="flex justify-center mb-8">
                        <h2 className="text-2xl font-bold">Popular Products</h2>
                    </div>
                    <Carousel className={"space-x-4 py-8 w-full"}>
                        <Carousel.Item>
                            <Card className={"bg-base-200"}>
                                <Card.Image
                                    src={
                                        "https://picsum.photos/seed/picsum/300"
                                    }
                                    alt={"Product 1"}
                                />
                                <Card.Body>
                                    <Card.Title> Product 1 </Card.Title>
                                    <p>Category</p>
                                    <p>Rp. 1000</p>
                                </Card.Body>
                            </Card>
                        </Carousel.Item>
                        <Carousel.Item>
                            <Card className={"bg-base-200"}>
                                <Card.Image
                                    src={
                                        "https://picsum.photos/seed/picsum/300"
                                    }
                                    alt={"Product 1"}
                                />
                                <Card.Body>
                                    <Card.Title> Product 1 </Card.Title>
                                    <p>Category</p>
                                    <p>Rp. 1000</p>
                                </Card.Body>
                            </Card>
                        </Carousel.Item>
                        <Carousel.Item>
                            <Card className={"bg-base-200"}>
                                <Card.Image
                                    src={
                                        "https://picsum.photos/seed/picsum/300"
                                    }
                                    alt={"Product 1"}
                                />
                                <Card.Body>
                                    <Card.Title> Product 1 </Card.Title>
                                    <p>Category</p>
                                    <p>Rp. 1000</p>
                                </Card.Body>
                            </Card>
                        </Carousel.Item>
                        <Carousel.Item>
                            <Card className={"bg-base-200"}>
                                <Card.Image
                                    src={
                                        "https://picsum.photos/seed/picsum/300"
                                    }
                                    alt={"Product 1"}
                                />
                                <Card.Body>
                                    <Card.Title> Product 1 </Card.Title>
                                    <p>Category</p>
                                    <p>Rp. 1000</p>
                                </Card.Body>
                            </Card>
                        </Carousel.Item>
                    </Carousel>
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
