import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CurrencyFormater from "@/lib/CurrencyFormater";
import { ReceiptPercentIcon } from "@heroicons/react/24/outline";
import { Head, Link } from "@inertiajs/react";
import axios from "axios";

export default function Order({ orders, auth, cartCount }) {
  const handleRequestInvoice = (id) => {
    axios.post(route("invoice"), { id: id }).then((response) => {
      window.open(response.data.invoice, "_blank");
    });
  };
  return (
    <AuthenticatedLayout
      auth={auth}
      cartCount={cartCount}
      header={
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold lg:text-3xl">Order History</h1>
            <p className="text-xs text-gray-500 lg:text-sm">
              View your order history
            </p>
          </div>
          <div className="flex space-x-4">
            <button className="btn-ghost btn">Filter</button>
            <button className="btn-ghost btn">Sort</button>
          </div>
        </div>
      }
    >
      <Head title="Order History" />
      <div className="mx-auto my-4 max-w-7xl px-8">
        {orders.length === 0 && (
          <div className="flex h-96 items-center justify-center">
            <div className="text-center">
              <p className="text-2xl font-bold">No orders found</p>
              <p className="text-gray-500">
                You have not placed any orders yet
              </p>
              <Link href="/products" className="btn-primary btn mt-4">
                Shop Now
              </Link>
            </div>
          </div>
        )}
        {orders.map((order) => (
          <div key={order.id} className="mt-10 rounded-xl border">
            <div className="flex items-center justify-between p-8">
              <div className="flex flex-col text-xs lg:text-lg">
                <span>ID</span>
                <span className="font-bold text-primary">#{order.id}</span>
              </div>
              <div className="flex flex-col text-xs lg:text-lg">
                <span>Date</span>
                <span className="font-bold text-primary">
                  {order.createdAt}
                </span>
              </div>
              <div className="flex flex-col text-xs lg:text-lg">
                <span>Total</span>
                <span className="font-bold text-primary">
                  {CurrencyFormater(order.total)}
                </span>
              </div>
              <div className="flex flex-col text-xs lg:text-lg">
                <span>Status</span>
                {order.status === "completed" && (
                  <span className="font-bold text-primary">{order.status}</span>
                )}
                {order.status === "pending" && (
                  <span className="font-bold text-warning">{order.status}</span>
                )}
                {order.status === "processing" && (
                  <span className="font-bold text-secondary">
                    {order.status}
                  </span>
                )}
                {order.status === "canceled" && (
                  <span className="font-bold text-error">{order.status}</span>
                )}
              </div>
              <button
                className="btn-outline btn-ghost btn-sm btn gap-2 font-bold"
                onClick={() => handleRequestInvoice(order.id)}
              >
                <span className="hidden lg:block">Invoice</span>
                <ReceiptPercentIcon className="h-5 w-5" />
              </button>
            </div>
            {order.items.map((item) => (
              <div key={item.id}>
                <div className="flex flex-col border-t p-8 lg:flex-row lg:space-x-4">
                  <div className="basis-1/6 lg:rounded-lg lg:border lg:shadow-md">
                    <img
                      src={item.image}
                      className="aspect-square object-contain"
                      alt={item.name}
                    />
                  </div>
                  <div className="my-4 flex-grow space-y-4 lg:my-0 lg:pl-8">
                    <h2 className="text-lg font-bold">{item.name}</h2>
                    <p>{item.desc}</p>
                    <div className="grid grid-cols-3 place-items-center gap-4">
                      {item.variants.map((variant, index) => (
                        <span className="p-4" key={index}>
                          {variant.value}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex basis-1/6 items-center justify-between lg:flex-col lg:items-start lg:justify-start lg:space-y-4">
                    <span className="text-lg font-bold text-primary">
                      {CurrencyFormater(item.price)}
                    </span>
                    <div className="text-md space-x-2 rounded-md border-2 p-2 ">
                      <span>Qty :</span>
                      <span>{item.qty}</span>
                    </div>
                  </div>
                </div>
                {/* <div className="flex items-center justify-between border-t p-8">
                  {order.status === "pending" && (
                    <div className="flex space-x-4">
                      <button className="btn-secondary btn">Cancel</button>
                      <button className="btn-primary btn">Pay</button>
                    </div>
                  )}
                  {order.status === "paid" && (
                    <div className="flex space-x-4">
                      <button className="btn-secondary btn">Cancel</button>
                      <button className="btn-primary btn">Ship</button>
                    </div>
                  )}
                  {order.status === "shipped" && (
                    <div className="flex space-x-4">
                      <button className="btn-secondary btn">Cancel</button>
                      <button className="btn-primary btn">Deliver</button>
                    </div>
                  )}
                  <p className={"font-lg badge p-2"}>{order.status}</p>
                  <div>
                    <Link
                      href={route("product.show", { product: item.product })}
                      className="btn-secondary btn"
                      as="button"
                    >
                      View Product
                    </Link>
                  </div>
                </div> */}
              </div>
            ))}
          </div>
        ))}
      </div>
    </AuthenticatedLayout>
  );
}
