import Card from "./Card";
import Button from "./Button";
import Input from "./Input";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link } from "@inertiajs/inertia-react";

export default function ExploreByCategory({ categories }) {
  const [category, setCategory] = useState(categories[0]);

  return (
    <div>
      <div className="flex justify-center mb-8">
        <h2 className="text-2xl font-bold">Explore by Category</h2>
      </div>
      <div className="grid lg:grid-cols-3 gap-x-4 justify-center">
        <div className="flex flex-col items-center justify-center sm:mb-10 max-h-screen place-content-between space-y-2">
          <div className="flex justify-center w-full">
            <Input
              type={"text"}
              placeholder={"Search"}
              className={"input-bordered w-full"}
            />
          </div>
          <div className="grow">
            <div className="flex flex-row flex-wrap justify-center lg:flex-col lg:items-start lg:space-y-8 lg:border-r-2 lg:mr-10 lg:pl-8 h-full">
              {categories.map((category, index) => (
                <button
                  className="text-left btn btn-ghost"
                  key={category.id}
                  onClick={() => setCategory(categories[index])}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          <Link
            href={route("product.index")}
            as="button"
            className="btn btn-primary gap-2 text-white w-fit"
          >
            Explore
            <ArrowRightIcon className={"w-5 h-5"} />
          </Link>
        </div>
        <div className="col-span-2 max-h-screen overflow-y-auto snap-y scroll-pt-12 overscroll-x-none">
          <div className="grid justify-center md:grid-cols-2 lg:gap-x-10 gap-y-12 snap-start lg:pr-8">
            {category.products.map((product) => (
              <Link
                href={route("product.show", product.id)}
                key={product.id}
                className="w-96 h-72"
              >
                <Card className={"image-full h-80"}>
                  <Card.Image src={product.image} alt={product.name} />
                  <Card.Body className={"justify-center items-center"}>
                    <Card.Title className={"text-2xl font-bold"}>
                      {product.name}
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
