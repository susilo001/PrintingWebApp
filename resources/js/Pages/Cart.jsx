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

export default function Cart({ cart }) {
  useEffect(() => {
    Midtrans();
  }, []);

  const handleChangeQty = (id, qty) => {
    setTimeout(() => {
      router.put(route("cart.update", { cartItem: id, qty: qty }), {
        only: ["cart"],
        preserveScroll: true,
        preserveState: true,
      });
    }, 2000);
  };

  const showSnapPayment = (page) => {
    window.snap.pay(page.props.token, {
      onSuccess: function (result) {
        router.post(
          route("order.store", {
            order_id: result.order_id,
            status: result.transaction_status,
            payment_type: result.payment_type,
            gross_amount: result.gross_amount,
            transaction_id: result.transaction_id,
            transaction_time: result.transaction_time,
            transaction_message: result.status_message,
          }),
          {
            preserveScroll: true,
            preserveState: true,
          }
        );
      },
      onPending: function (result) {
        router.post(
          route("order.store", {
            order_id: result.order_id,
            status: result.transaction_status,
            payment_type: result.payment_type,
            gross_amount: result.gross_amount,
            transaction_id: result.transaction_id,
            transaction_time: result.transaction_time,
            transaction_message: result.status_message,
          }),
          {
            preserveScroll: true,
            preserveState: true,
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
            router.get(route("cart.index"));
          }
        });
      },
      onClose: function () {
        Swal.fire({
          title: "Payment Cancelled",
          text: "You have cancelled the payment",
          icon: "error",
        }).then((result) => {
          if (result.isConfirmed) {
            router.get(route("cart.index"));
          }
        });
      },
    });
  };

  const handleSnapPayment = () => {
    Swal.fire({
      title: "Please use this card information",
      text: "Card No: 4811 1111 1111 1114 Exp MM/YY CVV: 123",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Proceed",
    }).then((result) => {
      if (result.isConfirmed) {
        window.snap.show();
        router.visit(route("cart.checkout"), {
          method: "GET",
          preserveScroll: true,
          preserveState: true,
          onSuccess: (page) => {
            showSnapPayment(page);
          },
        });
      }
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        router.delete(route("cart.destroy", { cartItem: id }));
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
      <div className="container mx-auto my-12 max-w-7xl h-screen px-4 sm:px-6 lg:px-8">
        {cart.cartItems.length === 0 ? (
          <div className="flex h-96 items-center justify-center">
            <div className="text-center">
              <div className="flex items-center space-x-2">
                <h2 className="text-2xl font-bold">Your cart is empty</h2>
                <ExclamationTriangleIcon className="h-8 w-8 text-error" />
              </div>
              <Link
                href={route("product.index")}
                className="btn-error btn mt-4"
                as="button"
              >
                Shop Now
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-flow-row-dense gap-y-4 lg:grid-cols-3 lg:gap-x-8">
            <div className="lg:col-span-2">
              {cart.cartItems.map((item) => (
                <div
                  key={item.id}
                  className="mb-8 rounded-lg border p-8 shadow-lg"
                >
                  <div className="flex flex-col items-center space-y-4 sm:space-y-0 justify-center sm:flex-row sm:items-start sm:space-x-6">
                    <img
                      src={item.design}
                      className="aspect-square object-cover rounded-xl w-52 h-52 bg-base-200"
                      alt={item.name}
                    />
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-bold">{item.name}</h3>
                        <input
                          className={"input-bordered input input-sm w-20"}
                          type="number"
                          name="qty"
                          defaultValue={item.qty}
                          onChange={(e) =>
                            handleChangeQty(item.id, e.target.value)
                          }
                        />
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="btn-ghost btn-circle btn"
                        >
                          <TrashIcon className="h-6 w-6 text-error" />
                        </button>
                      </div>
                      <span className="font-bold text-primary">
                        {CurrencyFormater(item.price)}
                      </span>
                      <p className="break-words text-justify">
                        {item.description}
                      </p>
                      <ul className="flex items-center space-x-2">
                        {item.variants.map((variant, index) => (
                          <li
                            className="pr-2 border-r-2 font-semibold"
                            key={index}
                          >
                            {" "}
                            {variant.value}{" "}
                          </li>
                        ))}
                      </ul>
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
                      {CurrencyFormater(cart.subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-base-content pb-4">
                    <div>Discount</div>
                    <span className="font-bold">
                      {CurrencyFormater(cart.discount)}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-base-content pb-4">
                    <div>Tax</div>
                    <span className="font-bold">
                      {CurrencyFormater(cart.tax)}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-base-content pb-4">
                    <div>Total</div>
                    <span className="font-bold">
                      {CurrencyFormater(cart.total)}
                    </span>
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
