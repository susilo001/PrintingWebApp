import Button from "@/Components/Button";
import Card from "@/Components/Card";
import Input from "@/Components/Input";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Currency from "@/utils/Currency";
import { FunnelIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Head, Link, router } from "@inertiajs/react";
import { debounce } from "lodash";
import { useCallback, useState } from "react";

export default function Products({ products, categories }) {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    fecthProductByName(value);
  };

  const fecthProductByName = useCallback(
    debounce((value) => {
      if (value !== "") {
        router.get(
          route("product.index"),
          { name: value },
          { only: ["products"], preserveState: true, replace: true }
        );
      } else {
        router.get(route("product.index"));
      }
    }, 3000),
    []
  );
  

  const handleCategoryChange = useCallback((e) => {
    if (e.target.value) {
      router.get(
        route("product.index"),
        { category: e.target.value },
        { only: ["products"], preserveState: true, replace: true }
      );
    } else {
      router.get(route("product.index"));
    }
  }, []);

  return (
    <AuthenticatedLayout
      header={
        <div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Products</h1>
              <p className="text-gray-500">View all products</p>
            </div>
            <div className="hidden sm:flex sm:items-center sm:space-x-4 ">
              <Input
                className="input-bordered input-sm"
                placeholder="Search"
                value={search}
                handleChange={handleSearch}
              />
              <select className="select" onChange={handleCategoryChange}>
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:hidden">
              <Button
                className="btn-ghost btn-circle"
                onClick={() => setIsOpen((previousState) => !previousState)}
              >
                {isOpen ? (
                  <XMarkIcon className="h-5 w-5 text-gray-500" />
                ) : (
                  <FunnelIcon className="h-5 w-5 text-gray-500" />
                )}
              </Button>
            </div>
          </div>
          <div className={(isOpen ? "block" : "hidden") + " mt-4 sm:hidden"}>
            <div>
              <Input
                className="input-bordered"
                placeholder="Search"
                value={search}
                handleChange={handleSearch}
              />
              <select className="select" onChange={handleCategoryChange}>
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      }
    >
      <Head title="Products" />
      {products.length === 0 && (
        <div className="text-center">
          <h1 className="text-3xl font-bold text-warning">No Products Found</h1>
          <p className="text-gray-500">Try searching for something else</p>
        </div>
      )}
      <div className="grid place-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <Link key={product.id} href={route("product.show", product.id)}>
            <Card className="h-72 w-72">
              <Card.Image alt={product.name} srcSet={product.images[0]} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Actions className="flex items-center justify-between">
                  <span className="font-bold text-primary">
                    {Currency.getPrice(product.prices)}
                  </span>
                  <span className="badge badge-accent p-2 text-xs font-semibold">
                    {product.category.name}
                  </span>
                </Card.Actions>
              </Card.Body>
            </Card>
          </Link>
        ))}
      </div>
    </AuthenticatedLayout>
  );
}
