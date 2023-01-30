import Card from "./Card";
import Input from "./Input";
import {
  ArrowRightIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Link } from "@inertiajs/inertia-react";

export default function ExploreByCategory({ categories }) {
  const [category, setCategory] = useState(categories[0]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(category.products);
  }, [category]);

  const handleSearch = (e) => {
    const filteredProducts = [];
    categories.forEach((category) => {
      category.products.forEach((product) => {
        if (product.name.toLowerCase().includes(e.target.value.toLowerCase())) {
          filteredProducts.push(product);
        }
      });
    });

    setProducts(filteredProducts);
  };

  return (
    <div>
      <div className="flex justify-center mb-8">
        <h2 className="text-2xl font-bold">Explore by Category</h2>
      </div>
      <div className="grid grid-flow-row-dense max-h-screen justify-center overflow-hidden gap-y-4 mb-8">
        <div className="flex justify-center h-fit">
          <Input
            type={"text"}
            placeholder={"Search"}
            className={"input-bordered"}
            handleChange={handleSearch}
          />
        </div>

        <div className="flex flex-row flex-wrap items-center justify-center  h-full overflow-y-auto">
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

        <div className="flex justify-center">
          <Link
            href={route("product.index")}
            as="button"
            className="btn btn-primary btn-wide gap-2 h-fit text-white"
          >
            Explore More
            <ArrowRightIcon className={"w-5 h-5"} />
          </Link>
        </div>
      </div>
      <div className="grid gap-x-4 justify-center">
        <div className="max-h-screen overflow-y-auto snap-y scroll-pt-12 overscroll-x-none">
          {products.length === 0 && (
            <div className="flex justify-center items-center space-x-4 border p-8 rounded border-error">
              <ExclamationTriangleIcon className={"w-6 h-6 text-error"} />
              <h2 className="text-xl md:text-2xl font-bold text-error">
                Product Not Found
              </h2>
            </div>
          )}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 justify-center gap-x-10 gap-y-12 snap-start pb-8 px-8">
            {products.map((product) => (
              <Link
                href={route("product.show", product.id)}
                key={product.id}
                className="md:w-96 md:h-72"
              >
                <Card className={"image-full h-80"}>
                  <Card.Image
                    src={
                      product.images[0]
                        ? product.images[0]
                        : "https://picsum.photos/200"
                    }
                    className={"object-cover object-center"}
                    alt={product.name}
                  />
                  <Card.Body className={"justify-end items-center"}>
                    <Card.Title className={"text-2xl hover:font-bold"}>
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
