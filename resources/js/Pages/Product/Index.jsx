import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/inertia-react";
import Card from "@/Components/Card";
import CurrencyFormater from "@/lib/CurrencyFormater";

export default function Products({ products, auth, cartCount }) {
  return (
    <AuthenticatedLayout
      auth={auth}
      cartCount={cartCount}
      header={
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Products</h1>
            <p className="text-gray-500">View all products</p>
          </div>
          <div className="flex space-x-4">
            <button className="btn btn-ghost">Filter</button>
            <button className="btn btn-ghost">Sort</button>
          </div>
        </div>
      }
    >
      <div className="max-w-7xl mx-auto my-10 flex justify-center">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {products.map((product) => (
            <Link
              className="w-fit "
              key={product.id}
              href={route("product.show", product.id)}
            >
              <Card className={"w-80 shadow-xl hover:bg-base-200"}>
                <Card.Image
                  className={"bg-cover w-full h-72"}
                  src={product.image}
                  alt={product.name}
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <span className="font-bold">
                    {CurrencyFormater(product.prices[0].price)}
                  </span>
                  <span className="badge badge-sm badge-secondary">
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
