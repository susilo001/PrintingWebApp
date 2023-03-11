import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CurrencyFormater from "@/lib/CurrencyFormater";
import { ReceiptPercentIcon } from "@heroicons/react/24/outline";
import { Head, Link, router } from "@inertiajs/react";

export default function Order({ orders }) {
  const handleRequestInvoice = async (id) => {
    // await axios.get(route("order.invoice", { order: id })).then((response) => {
    //   window.open(response.data.invoice, "_blank");
    // });
    router.get(route("order.invoice", { order: id }), {
      preserveState: true,
      preserveScroll: true,
      onSuccess: (response) => {
        // window.open(response.data.invoice, "_blank");
        console.log(response);
      },
    });
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
                <span>{CurrencyFormater(order.total)}</span>
              </div>
              <div className="flex flex-row justify-between text-xs lg:flex-col lg:text-lg">
                <span className="font-bold">Status</span>
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
                className="btn-outline btn-ghost btn-md btn gap-2 font-bold"
                onClick={() => handleRequestInvoice(order.id)}
              >
                <span>Invoice</span>
                <ReceiptPercentIcon className="h-5 w-5" />
              </button>
            </div>
            {order.items.map((item) => (
              <div key={item.id} className="border-y p-8">
                <div className="flex flex-col items-center sm:items-start sm:flex-row sm:space-x-4">
                  <img
                    src={item.image}
                    className="aspect-square object-contain w-52 h-52 rounded-lg bg-base-200"
                    alt={item.name}
                  />
                  <div className="my-4 flex-grow space-y-4 lg:my-0">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-bold">{item.product.name}</h2>
                      <span className="text-lg font-bold">
                        {CurrencyFormater(item.price)}
                      </span>
                    </div>
                    <p className="break-words text-justify">{item.desc}</p>
                    <ul className="flex items-center space-x-2">
                      {item.variants.map((variant, index) => (
                        <li key={index} className="pr-2 border-r-2">
                          <span className="font-bold">{variant.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex items-center justify-center sm:justify-end space-x-4">
                  <Link
                    href={route("product.show", { product: item.product })}
                    className="link link-primary link-hover font-bold text-lg"
                  >
                    View Product
                  </Link>
                  <Link
                    href={route("product.show", { product: item.product })}
                    className="link link-primary link-hover font-bold text-lg"
                  >
                    View Order
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </AuthenticatedLayout>
  );
}
