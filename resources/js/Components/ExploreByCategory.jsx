import CurrencyFormater from "@/lib/CurrencyFormater";
import {
  ArrowRightIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Card from "./Card";
import Input from "./Input";

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
      <div className="mb-8 flex justify-center">
        <h2 className="text-2xl font-bold">Explore by Category</h2>
      </div>
      <div className="mb-8 grid max-h-screen grid-flow-row-dense justify-center gap-y-4 overflow-hidden">
        <div className="flex h-fit justify-center">
          <Input
            type={"text"}
            placeholder={"Search"}
            className={"input-bordered"}
            handleChange={handleSearch}
          />
        </div>

        <div className="flex h-full flex-row flex-wrap items-center justify-center space-x-4">
          {categories.map((category, index) => (
            <button
              className="btn-ghost btn"
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
            className="btn-primary btn-wide btn h-fit gap-2"
          >
            Explore More
            <ArrowRightIcon className={"h-5 w-5"} />
          </Link>
        </div>
      </div>
      <div className="max-h-screen snap-y scroll-pt-12 overflow-y-auto overscroll-x-none">
        {products.length === 0 && (
          <div className="flex items-center justify-center space-x-4 rounded border border-error p-8">
            <ExclamationTriangleIcon className={"h-6 w-6 text-error"} />
            <h2 className="text-xl font-bold text-error md:text-2xl">
              Product Not Found
            </h2>
          </div>
        )}
        <div className="grid snap-start justify-center gap-x-10 gap-y-10 px-4 pb-4 md:grid-cols-2 md:px-8 xl:grid-cols-3">
          {products.map((product) => (
            <Link href={route("product.show", product.id)} key={product.id} className="link link-hover">
              <Card className="border shadow-xl hover:bg-base-200">
                <Card.Image
                  src={
                    product.images[0]
                      ? product.images[0]
                      : "https://picsum.photos/200/200"
                  }
                  className={"aspect-square object-contain"}
                  alt={product.name}
                />
                <Card.Body>
                  <Card.Title
                    className={
                      "flex items-center justify-between text-xl hover:font-bold"
                    }
                  >
                    <span>{product.name}</span>
                    <span className="text-primary">
                      {CurrencyFormater(product.prices[0].price)}
                    </span>
                  </Card.Title>
                </Card.Body>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
