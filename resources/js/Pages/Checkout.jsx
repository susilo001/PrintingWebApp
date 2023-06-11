import Button from "@/Components/Button";
import Input from "@/Components/Input";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, Link } from "@inertiajs/react";
import {
  CreditCardIcon,
  TrashIcon,
  WalletIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import Midtrans from "@/lib/midtrans";
import { useEffect } from "react";
import Swal from "sweetalert2";
import Currency from "@/utils/Currency";

export default function Checkout({ cart, addresses }) {

  useEffect(() => {
    Midtrans.load();
  }, []);

  const handleSubmit = () => {
    Swal.fire({
      title: "Checkout Keranjang Belanja",
      text: "Apakah anda yakin ingin melanjutkan pembayaran?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Lanjutkan",
    }).then((result) => {
      if (result.isConfirmed) {
        Midtrans.snapLoading();
        router.visit(route("cart.checkout"), {
          method: 'get',
          onSuccess: (page) => {
            Midtrans.snapPay(page.props.token);
          },
          onError: (error) => {
            Midtrans.snapLoadingHide();
            Swal.fire({ icon: "error", title: "Oops...", text: error.message });
          }
        });
      }
    });
  };

  const handleChangeQty = async (id, qty) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      router.put(route("cart.update", { cartItem: id, qty: qty }), {
        only: ["cart"],
        preserveScroll: true,
        preserveState: true,
      });
    } catch (error) {
      Swal.fire({ icon: "error", title: "Oops...", text: error.message });
    }
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
      header={<h1 className="text-2xl font-bold">Checkout</h1>}
    >
      <Head title="Checkout" />
      {cart.cartItems.length === 0 ? (
        <div className="flex h-96 items-center justify-center rounded-lg border border-error">
          <div className="text-center">
            <div className="flex items-center space-x-2">
              <h2 className="text-2xl font-bold">Keranjang Belanja Kosong</h2>
              <ExclamationTriangleIcon className="h-8 w-8 text-error" />
            </div>
            <Link
              href={route("product.index")}
              className="btn-error btn mt-4"
              as="button"
            >
              Belanja Sekarang
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 p-8 rounded-lg">
          <section className="space-y-8">
            <div>
              <h3 className="text-lg font-bold">Shipping Information</h3>
              <p>Pilih alamat pengiriman anda yang anda akan digunakan</p>
            </div>
            <div className="space-y-4">
              {addresses.map((address) => (
                <div className={`rounded-lg border space-y-4 w-full shadow-lg ${address.is_active ? 'border-primary' : ''}`} key={address.id}>
                  <div className="flex items-start justify-between border-b p-8 space-x-4">
                    <div className="flex-grow">
                      <h4 className="font-bold">{address.first_name} {address.last_name}</h4>
                      <p>{address.phone}</p>
                      <p>{address.address}</p>
                      <p>{address.city} {address.postal_code}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section className="space-y-4">
            <div className="flex items-start justify-between space-x-4">
              <div className="flex-grow">
                <h3 className="text-lg font-bold">Order Summary</h3>
              </div>
            </div>

            <div className="rounded-lg border space-y-4 w-full bg-base-100 shadow-lg">
              {cart.cartItems.map((item) => (
                <div className="flex items-start justify-between border-b p-8 space-x-4" key={item.id}>
                  <div className="flex-none">
                    <img
                      srcSet={item.design}
                      className="rounded-lg bg-base-200 object-cover w-24"
                      alt={item.name}
                    />
                  </div>
                  <div className="grow w-full">
                    <h4 className="font-bold">{item.name}</h4>
                    <ul>
                      {item.variants.map((variant, index) => (
                        <li key={index}>{variant.name} : {variant.value}</li>
                      ))}
                    </ul>
                    <span className="text-sm">{Currency.getCurrencyFormat(item.price)}</span>
                  </div>
                  <div className="flex-none">
                    <div className="flex flex-col items-end">
                      <Button className="btn-ghost btn-circle" type='submit' onClick={() => handleDelete(item.id)}>
                        <TrashIcon className="h-5 w-5 text-error" />
                      </Button>
                      <Input type="number" className="input-bordered w-20 input-sm" defaultValue={item.qty} handleChange={(e) => handleChangeQty(item.id, e.target.value)} />
                    </div>
                  </div>
                </div>
              ))}
              <div className="space-y-8 px-8 border-b pb-4">
                <div className="space-y-4 border-b pb-4">
                  <div className="flex justify-between">
                    <span className="font-semibold">Subtotal</span>
                    <span className="font-semibold">{Currency.getCurrencyFormat(cart.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Discount</span>
                    <span className="font-semibold">{Currency.getCurrencyFormat(cart.discount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Taxes</span>
                    <span className="font-semibold">{Currency.getCurrencyFormat(cart.tax)}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">{Currency.getCurrencyFormat(cart.total)}</span>
                </div>
              </div>
              <div className="p-8">
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  className="btn-primary btn-block text-white gap-2"
                >
                  Pilih Pembayaran
                  <CreditCardIcon className="h-6 w-6" />
                  <WalletIcon className="h-6 w-6" />
                </Button>
              </div>
            </div>
          </section>
        </div>

      )}

    </AuthenticatedLayout>
  );
}
