import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CurrencyFormater from "@/lib/CurrencyFormater";
export default function Order({ orders, auth, cartCount }) {
  console.log(orders);
  return (
    <AuthenticatedLayout auth={auth} cartCount={cartCount}>
      <div className="max-w-7xl px-8 mx-auto my-20">
        {orders.map((order) => (
          <div key={order.id} className="rounded-xl border mt-10">
            <div className="flex justify-between items-center p-8">
              <div className="flex flex-col">
                <span>Order number</span>
                <span>#{order.id}</span>
              </div>
              <div className="flex flex-col">
                <span>Order placed</span>
                <span>{order.created_at}</span>
              </div>
              <div className="flex flex-col">
                <span>Total amount</span>
                <span>{CurrencyFormater(order.total_amount)}</span>
              </div>
              <div className="flex flex-col">
                <button className="btn btn-ghost">Invoice</button>
              </div>
            </div>
            {order.order_items.map((item) => (
              <div key={item.id}>
                <div className="p-8 flex border-t space-x-4">
                  <img src="http://picsum.photos/200" className="rounded-lg" />
                  <div className="flex-grow pl-8 space-y-4">
                    <p>{item.name}</p>
                    <div className="grid grid-cols-3 gap-y-4">
                      {item.variants.map((variant) => (
                        <p>{variant.value}</p>
                      ))}
                    </div>
                    <p>{item.description}</p>
                  </div>
                  <div>
                    <p>{CurrencyFormater(item.price)}</p>
                    <p>{item.qty}</p>
                  </div>
                </div>
                <div className="p-8 flex justify-between">
                  <p>{order.status}</p>
                  <div>
                    <button>View Product</button>
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
