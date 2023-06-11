import Button from "@/Components/Button";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Currency from "@/utils/Currency";
import { ReceiptPercentIcon } from "@heroicons/react/24/outline";
import { Head, Link, router, usePage } from "@inertiajs/react";

export default function Order({ orders }) {
  const { flash } = usePage().props;

  flash.invoice ? window.open(flash.invoice, "_blank") : null;

  const handleRequestInvoice = async (id) => {
    router.get(route("order.invoice", { order: id }));
  };

  return (
    <AuthenticatedLayout
      header={
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold lg:text-3xl">Order History</h1>
            <p className="text-xs text-gray-500 lg:text-sm">
              View your order history
            </p>
          </div>
          <div className="flex space-x-4">
            <Button className="btn-ghost">Filter</Button>
            <Button className="btn-ghost">Sort</Button>
          </div>
        </div>
      }
    >
      <Head title="Order History" />
      {orders.length === 0 && (
        <div className="flex h-96 items-center justify-center">
          <div className="text-center">
            <p className="text-2xl font-bold">No orders found</p>
            <p className="text-gray-500">You have not placed any orders yet</p>
            <Link href="/products" className="btn-primary btn mt-4">
              Shop Now
            </Link>
          </div>
        </div>
      )}
      {orders.map((order) => (
        <div key={order.id} className="mt-10 rounded-xl border shadow-xl">
          <div className="flex flex-col justify-between space-y-4 p-8 lg:flex-row lg:items-center lg:space-y-0">
            <div className="flex flex-row justify-between text-xs lg:flex-col lg:text-lg">
              <span className="font-bold">Order number</span>
              <span>#{order.id}</span>
            </div>
            <div className="flex flex-row justify-between text-xs lg:flex-col lg:text-lg">
              <span className="font-bold ">Date placed</span>
              <span>{order.createdAt}</span>
            </div>
            <div className="flex flex-row justify-between text-xs lg:flex-col lg:text-lg">
              <span className="font-bold">Total amount</span>
              <span>{Currency.getCurrencyFormat(order.total)}</span>
            </div>
            <div className="flex flex-row justify-between text-xs lg:flex-col lg:text-lg">
              <span className="font-bold">Status</span>
              <span>{order.status}</span>
            </div>
            <Button
              className="btn-ghost btn-outline btn-sm gap-2 font-bold normal-case"
              onClick={() => handleRequestInvoice(order.id)}
            >
              <ReceiptPercentIcon className="h-5 w-5" />
              <span>Invoice</span>
            </Button>
          </div>
          {order.items.map((item) => (
            <div key={item.id} className="border-y p-8">
              <div className="flex flex-col items-center sm:flex-row sm:items-start sm:space-x-4">
                <img
                  srcSet={item.image}
                  className="aspect-square h-32 w-32 rounded-lg bg-base-200 object-contain"
                  alt={item.name}
                />
                <div className="my-4 flex-grow space-y-4 lg:my-0">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">{item.product.name}</h2>
                    <span className="text-lg font-semibold">
                      {Currency.getCurrencyFormat(item.price)}
                    </span>
                  </div>
                  <p className="break-words text-justify">{item.desc}</p>
                  <ul className="flex items-center space-x-2">
                    {item.variants.map((variant, index) => (
                      <li key={index} className="border-r-2 pr-2">
                        <span className="font-semibold">{variant.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-4 sm:justify-end">
                <Link
                  href={route("product.show", { product: item.product })}
                  className="link-hover link-primary link font-semibold"
                >
                  View Product
                </Link>
                <Link
                  href={route("product.show", { product: item.product })}
                  className="link-hover link-primary link font-semibold"
                >
                  View Order
                </Link>
              </div>
            </div>
          ))}
        </div>
      ))}
    </AuthenticatedLayout>
  );
}
