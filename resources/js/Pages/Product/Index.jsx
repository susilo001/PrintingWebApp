import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/inertia-react";

export default function ProductIndex({ products, auth, cartCount }) {
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
      <div className="max-w-7xl px-8 mx-auto my-10">
        {products.length === 0 && (
          <div className="flex justify-center items-center h-96">
            <div className="text-center">
              <p className="text-2xl font-bold">No products found</p>
              <p className="text-gray-500">
                You have not added any products yet
              </p>
              <Link href="/product/create" className="btn btn-primary mt-4">
                Add Product
              </Link>
            </div>
          </div>
        )}
        <div className="grid grid-cols-3 gap-10">
          {products.map((product) => (
            <div key={product.id} className="rounded-xl border">
              <div className="p-8 flex flex-col space-y-4">
                <img src="http://picsum.photos/200" alt={'product name'} className="rounded-lg" />
                <p>{product.name}</p>
                <p>{product.description}</p>
                <p>{product.price}</p>
                <p>{product.quantity}</p>
                <div className="flex justify-between items-center">
                  <Link
                    href={`/product/${product.id}/edit`}
                    className="btn btn-ghost"
                  >
                    Edit
                  </Link>
                  <button className="btn btn-ghost">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
