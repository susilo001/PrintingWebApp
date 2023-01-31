import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CurrencyFormater from "@/lib/CurrencyFormater";
import { Link } from "@inertiajs/react";
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
            <h1 className="text-3xl font-bold">Order History</h1>
            <p className="text-gray-500">View your order history</p>
          </div>
          <div className="flex space-x-4">
            <button className="btn-ghost btn">Filter</button>
            <button className="btn-ghost btn">Sort</button>
          </div>
        </div>
      }
    >
      <div className="mx-auto my-10 max-w-7xl px-8">
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
              <div className="flex flex-col">
                <span className="text-lg font-bold">Order number</span>
                <span>#{order.id}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold">Order placed</span>
                <span>{order.created_at}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold">Total amount</span>
                <span>{CurrencyFormater(order.total_amount)}</span>
              </div>
              <div className="flex flex-col">
                <button
                  className="btn-outline btn-ghost btn font-bold "
                  onClick={() => handleRequestInvoice(order.id)}
                >
                  Invoice
                </button>
              </div>
            </div>
            {order.order_items.map((item) => (
              <div key={item.id}>
                <div className="flex space-x-4 border-t p-8">
                  <img src="http://picsum.photos/200" className="rounded-lg" />
                  <div className="flex-grow space-y-4 pl-8">
                    <h2 className="text-lg font-bold">{item.name}</h2>
                    <div className="grid grid-cols-3 gap-y-4">
                      {item.variants.map((variant, index) => (
                        <span key={index}>{variant.value}</span>
                      ))}
                    </div>
                    <p>{item.description}</p>
                  </div>
                  <div>
                    <p className="font-bold">{CurrencyFormater(item.price)}</p>
                    <div className="space-x-2">
                      <span>Quantity:</span>
                      <span>{item.qty}</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between p-8">
                  <p className={"font-lg badge"}>{order.status}</p>
                  <div>
                    <Link
                      href={route("product.show", { product: item.product_id })}
                      className="btn-ghost btn"
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
