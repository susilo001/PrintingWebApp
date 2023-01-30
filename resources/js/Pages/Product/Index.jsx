import Card from "@/Components/Card";
import Input from "@/Components/Input";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CurrencyFormater from "@/lib/CurrencyFormater";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";
import { useState } from "react";

export default function Products({ products, categories, auth, cartCount }) {
  const [search, setSearch] = useState(undefined);

  const handleSearch = (e) => {
    setSearch(e.target.value);

    if (search === "") {
      Inertia.reload();
    } else {
      setTimeout(() => {
        Inertia.get(
          route("product.index"),
          { name: search },
          { only: ["products"], preserveState: true }
        );
      }, 500);
    }
  };

  const handleCategoryChange = (e) => {
    Inertia.get(
      route("product.index"),
      { category: e.target.value },
      { only: ["products"] }
    );
  };

  return (
    <AuthenticatedLayout
      auth={auth}
      cartCount={cartCount}
      header={
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Products</h1>
            <p className="text-gray-500">View all products</p>
          </div>
          <div className="flex items-center space-x-4">
            <select className="select" onChange={handleCategoryChange}>
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <Input
              className="input-bordered input-sm"
              placeholder="Search"
              value={search}
              handleChange={handleSearch}
            />
          </div>
        </div>
      }
    >
      <div className="mx-auto my-10 flex max-w-7xl justify-center">
        {products.length === 0 && (
          <div className="text-center">
            <h1 className="text-3xl font-bold text-warning">
              No Products Found
            </h1>
            <p className="text-gray-500">Try searching for something else</p>
          </div>
        )}
        <div className="grid justify-center gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Link
              className="w-fit "
              key={product.id}
              href={route("product.show", product.id)}
            >
              <Card className={"w-80 shadow-xl hover:bg-base-200"}>
                <Card.Image
                  className={"h-72 w-full object-cover"}
                  src={product.images[0]}
                  alt={product.name}
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <span className="font-bold">
                    {CurrencyFormater(product.prices[0].price)}
                  </span>
                  <span className="badge-secondary badge badge-sm">
                    {product.category.name}
                  </span>
                </Card.Body>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
