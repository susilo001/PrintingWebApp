import Input from "@/Components/Input";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CurrencyFormater from "@/lib/CurrencyFormater";
import {
  BanknotesIcon,
  CreditCardIcon,
  ShoppingCartIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link } from "@inertiajs/inertia-react";
import { useEffect } from "react";

export default function Cart({
  auth,
  cart,
  cartCount,
  discount,
  subtotal,
  tax,
  weight,
  total,
}) {
  const data = Object.entries(cart).map(([key, value]) => value);

  useEffect(() => {
    const midtransScriptUrl = import.meta.env.VITE_MIDTRANS_SCRIPT_URL;

    const MidtransClientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;

    scriptTag.setAttribute("data-client-key", MidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  const handleCashPayment = () => {
    Inertia.post(
      route("cart.checkout"),
      {
        payment_method: "cash",
      },
      {
        preserveScroll: true,
        preserveState: true,
        onSuccess: (page) => {
          Inertia.put(
            route("order.update", {
              order: page.props.token.id,
              status: "Cash On Delivery",
              payment_type: "cash",
            })
          );
        },
      }
    );
  };

  const handleSnapPayment = () => {
    Inertia.post(
      route("cart.checkout"),
      {
        payment_method: "snap",
      },
      {
        preserveScroll: true,
        preserveState: true,
        onSuccess: (page) => {
          window.snap.pay(page.props.token, {
            onSuccess: function (result) {
              Inertia.put(
                route("order.update", {
                  order: result.order_id,
                  status: result.transaction_status,
                  payment_type: result.payment_type,
                })
              );
            },
            onPending: function (result) {
              console.log(result);
            },
            onError: function (result) {
              alert("Payment failed");
              console.log(result);
            },
            onClose: function () {
              console.log(
                "customer closed the popup without finishing the payment"
              );
            },
          });
        },
      }
    );
  };

  return (
    <AuthenticatedLayout
      auth={auth}
      cartCount={cartCount}
      header={
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">Cart</h1>
            <ShoppingCartIcon className="h-6 w-6" />
          </div>
        </div>
      }
    >
      <Head title="Cart" />
      <div className="mx-auto my-10 max-w-7xl px-8">
        <div className="grid grid-flow-row-dense grid-cols-3 gap-x-8">
          <div className="col-span-2">
            {data.map((item) => (
              <div key={item.id} className="border-y py-10">
                <div className="flex justify-between space-x-8">
                  <div className="rounded-lg">
                    <img
                      src={item.options.design}
                      className="h-60 w-60 rounded-lg bg-contain"
                      alt={item.name}
                    />
                  </div>
                  <div className="grow">
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold">{item.name}</h3>
                      <div className="grid grid-cols-3 gap-2">
                        {item.options.variants.map((variant, index) => (
                          <div key={index}>{variant.value}</div>
                        ))}
                      </div>
                      <div>{item.weight + "/kg"}</div>
                      <div>
                        <span className="font-bold">
                          {CurrencyFormater(item.price)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-24">
                    <Input
                      type="number"
                      label={"Quantity"}
                      value={item.qty}
                      onChange={(e) => console.log(e.target.value)}
                      className={"input-bordered input-sm"}
                    />
                  </div>
                  <div className="w-24">
                    <Link
                      href={route("cart.destroy", { cart: item.rowId })}
                      method="delete"
                      className="btn-ghost btn-circle btn"
                      as="button"
                    >
                      <TrashIcon className="h-6 w-6 text-error" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="h-fit rounded-lg bg-base-200">
            <div className="space-y-4 p-8">
              <h2 className="text-xl font-bold">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-base-content pb-4">
                  <div>Subtotal</div>
                  <span>{CurrencyFormater(subtotal)}</span>
                </div>
                <div className="flex justify-between border-b border-base-content pb-4">
                  <div>Weight</div>
                  <span>{CurrencyFormater(weight)}</span>
                </div>
                <div className="flex justify-between border-b border-base-content pb-4">
                  <div>Tax</div>
                  <span>{CurrencyFormater(tax)}</span>
                </div>
                <div className="flex justify-between border-b border-base-content pb-4">
                  <div>Discount</div>
                  <span>{CurrencyFormater(discount)}</span>
                </div>
                <div className="flex justify-between border-b border-base-content pb-4">
                  <div>Total</div>
                  <span>{CurrencyFormater(total)}</span>
                </div>
              </div>
              <div className="space-y-4">
                <button
                  className="btn-secondary btn-block btn gap-2"
                  onClick={() => handleSnapPayment()}
                >
                  Pay with Midtrans
                  <CreditCardIcon className="h-6 w-6" />
                </button>
                <button
                  className="btn-success btn-block btn gap-2"
                  onClick={() => handleCashPayment()}
                >
                  Cash on Delivery
                  <BanknotesIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
