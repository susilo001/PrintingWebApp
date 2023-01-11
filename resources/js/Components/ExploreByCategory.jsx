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
      <div className="grid grid-cols-3 gap-x-4">
        <div className="flex flex-col max-h-screen place-content-between space-y-2">
          <div className="flex-none">
            <Input
              type={"text"}
              placeholder={"Search"}
              className={"input-bordered w-full"}
            />
          </div>
          <div className="grow">
            <div className="flex flex-col items-start space-y-8 border-r-2 mr-10 pl-8 h-full">
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
          <div className="flex-none">
            <Button className={"btn-primary btn-wide gap-2"}>
              Explore
              <ArrowRightIcon className={"w-5 h-5"} />
            </Button>
          </div>
        </div>
        <div className="col-span-2 max-h-screen overflow-y-auto snap-y scroll-pt-12 overscroll-x-none">
          <div className="grid grid-cols-2 gap-x-10 gap-y-12 snap-start pr-8">
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
                    {/* <Card.Actions>
                      <Button className={"btn-ghost"}>Explore</Button>
                    </Card.Actions> */}
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
