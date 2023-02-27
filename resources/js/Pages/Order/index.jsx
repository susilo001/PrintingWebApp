import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CurrencyFormater from "@/lib/CurrencyFormater";
import { ReceiptPercentIcon } from "@heroicons/react/24/outline";
import { Head, Link, usePage } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function Order({ orders }) {
  const { flash } = usePage().props;

  const handleRequestInvoice = async (id) => {
    await axios.get(route("invoice.show", { order: id })).then((response) => {
      window.open(response.data.invoice, "_blank");
    });
  };

  if (flash.message === "survey") {
    Swal.fire({
      title: "Survey",
      text: "Please fill this survey",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Proceed",
    }).then((result) => {
      if (result.isConfirmed) {
        window.open(
          "https://docs.google.com/forms/d/e/1FAIpQLSdFaRPZVIbostG6cYGgAbweL9mwxkm-OQ2bYarYk1ezjpfoaA/viewform?usp=sf_link",
          "_blank"
        );
      }
    });
  }

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
          <div key={order.id} className="mt-10 rounded-xl border shadow-lg">
            <div className="flex flex-col justify-between space-y-4 p-8 lg:flex-row lg:items-center lg:space-y-0">
              <div className="flex flex-row justify-between text-xs lg:flex-col lg:text-lg">
                <span>Order number</span>
                <span className="font-bold">{order.id}</span>
              </div>
              <div className="flex flex-row justify-between text-xs lg:flex-col lg:text-lg">
                <span>Date placed</span>
                <span className="font-bold ">{order.createdAt}</span>
              </div>
              <div className="flex flex-row justify-between text-xs lg:flex-col lg:text-lg">
                <span>Total amount</span>
                <span className="font-bold">
                  {CurrencyFormater(order.total)}
                </span>
              </div>
              <div className="flex flex-row justify-between text-xs lg:flex-col lg:text-lg">
                <span>Status</span>
                {order.status === "completed" && (
                  <span className="font-bold text-primary">{order.status}</span>
                )}
                {order.status === "pending" && (
                  <span className="font-bold text-warning">{order.status}</span>
                )}
                {order.status === "Proccessing" && (
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
                <span>Invoice</span>
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
                    <h2 className="text-lg font-bold">{item.product.name}</h2>
                    <p>{item.desc}</p>
                    <div className="grid place-items-start lg:grid-cols-3">
                      {item.variants.map((variant, index) => (
                        <span className="p-4" key={index}>
                          {variant.value}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex basis-1/6 items-center justify-between lg:flex-col lg:items-end lg:justify-start lg:space-y-4">
                    <span className="text-lg font-bold">
                      {CurrencyFormater(item.price)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t p-8">
                  <div>
                    <Link
                      href={route("product.show", { product: item.product })}
                      className="btn-primary btn-sm btn"
                      as="button"
                    >
                      View Product
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </AuthenticatedLayout>
  );
}
