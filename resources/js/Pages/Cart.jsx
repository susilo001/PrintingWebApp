import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CurrencyFormater from "@/lib/CurrencyFormater";
import Midtrans from "@/lib/midtrans";
import {
  CreditCardIcon,
  ExclamationTriangleIcon,
  ShoppingCartIcon,
  TrashIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";
import { Head, Link, router } from "@inertiajs/react";
import { useEffect } from "react";
import Swal from "sweetalert2";

export default function Cart({ cart, discount, subtotal, tax, weight, total }) {
  const data = Object.entries(cart).map(([key, value]) => value);

  useEffect(() => {
    Midtrans();
  }, []);

  const handleChangeQty = (rowId, qty) => {
    setTimeout(() => {
      router.put(route("cart.update", { cart: rowId }), {
        data: { qty: qty },
        only: ["cart"],
        preserveScroll: true,
        preserveState: true,
      });
    }, 5000);
  };

  const showSnapPayment = (page) => {
    window.snap.show();
    window.snap.pay(page.props.token, {
      onSuccess: function (result) {
        console.log(result);
        router.post(route("order.store"), {
          data: {
            order_id: result.order_id,
            status: result.transaction_status,
            payment_type: result.payment_type,
            gross_amount: result.gross_amount,
            transaction_id: result.transaction_id,
            transaction_time: result.transaction_time,
            transaction_message: result.status_message,
          },
        });
      },
      onPending: function (result) {
        router.put(
          route("order.update", {
            order: result.order_id,
            status: result.transaction_status,
            payment_type: result.payment_type,
          }),
          {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
              router.push(route("order.index"));
            },
          }
        );
      },
      onError: function (result) {
        Swal.fire({
          title: "Error",
          text: result.status_message,
          icon: "error",
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push(route("cart.index"));
          }
        });
      },
      onClose: function () {
        Swal.fire({
          title: "Close without procceeding payment",
          icon: "error",
        });
      },
    });
  };

  const handleSnapPayment = () => {
    Swal.fire({
      title: "Testing payment",
      text: "Please use this card information Card Number: 4811 1111 1111 1114 Exp Month: 01 Exp Year: 2025 CVV: 123",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Proceed",
    }).then((result) => {
      if (result.isConfirmed) {
        router.post(
          route("cart.checkout"),
          {},
          {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (page) => {
              showSnapPayment(page);
            },
          }
        );
      }
    });
  };

  const handleDelete = (rowId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        router.delete(route("cart.destroy", { cart: rowId }), {
          onSuccess: () => {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          },
        });
      }
    });
  };

  return (
    <AuthenticatedLayout
      header={
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">Cart</h1>
            <ShoppingCartIcon className="h-6 w-6" />
          </div>
        </div>
      }
    >
      <Head title="Shopping Cart" />
      <div className="container mx-auto my-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        {data.length === 0 ? (
          <div className="flex h-96 items-center justify-center">
            <div className="text-center">
              <div className="flex items-center space-x-2">
                <h2 className="text-2xl font-bold">Your cart is empty</h2>
                <ExclamationTriangleIcon className="h-8 w-8 text-error" />
              </div>
              <Link
                href={route("product.index")}
                className="btn-error btn-sm btn mt-4"
                as="button"
              >
                Shop Now
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-flow-row-dense gap-y-4 lg:grid-cols-3 lg:gap-x-8">
            <div className="lg:col-span-2">
              {data.map((item) => (
                <div
                  key={item.id}
                  className="mb-8 rounded-lg border py-10 shadow-lg"
                >
                  <div className="flex flex-col items-center lg:space-x-8">
                    <div className="rounded-xl lg:h-96 lg:w-96">
                      <img
                        src={"storage/" + item.options.design}
                        className="aspect-square object-cover"
                        alt={item.name}
                      />
                    </div>
                    <div className="mt-8 p-8">
                      <div className="space-y-4">
                        <h3 className="text-lg font-bold">{item.name}</h3>
                        <p>{item.options.description}</p>
                        <div className="grid grid-cols-3 items-center justify-center gap-2">
                          {item.options.variants.map((variant, index) => (
                            <div key={index}>{variant.value}</div>
                          ))}
                        </div>
                        <div className="text-secondary">
                          {item.weight + "/kg"}
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between space-x-8">
                        <div>
                          <span className="font-bold text-primary">
                            {CurrencyFormater(item.price)}
                          </span>
                        </div>
                        <input
                          className={"input-bordered input input-sm w-24"}
                          type="number"
                          name="qty"
                          defaultValue={item.qty}
                          onChange={(e) =>
                            handleChangeQty(item.rowId, e.target.value)
                          }
                        />
                        <button
                          onClick={() => handleDelete(item.rowId)}
                          className="btn-ghost btn-circle btn"
                        >
                          <TrashIcon className="h-6 w-6 text-error" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="h-fit rounded-lg border shadow-lg">
              <div className="space-y-4 p-8">
                <h2 className="text-xl font-bold">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between border-b border-base-content pb-4">
                    <div>Subtotal</div>
                    <span className="font-bold">
                      {CurrencyFormater(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-base-content pb-4">
                    <div>Weight</div>
                    <span className="font-bold">
                      {CurrencyFormater(weight)}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-base-content pb-4">
                    <div>Tax</div>
                    <span className="font-bold">{CurrencyFormater(tax)}</span>
                  </div>
                  <div className="flex justify-between border-b border-base-content pb-4">
                    <div>Discount</div>
                    <span className="font-bold">
                      {CurrencyFormater(discount)}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-base-content pb-4">
                    <div>Total</div>
                    <span className="font-bold">{CurrencyFormater(total)}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <button
                    className="btn-primary btn-block btn gap-2"
                    onClick={() => handleSnapPayment()}
                  >
                    Pay now
                    <CreditCardIcon className="h-6 w-6" />
                    <WalletIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AuthenticatedLayout>
  );
}
