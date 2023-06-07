import Button from "@/Components/Button";
import Input from "@/Components/Input";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, router } from "@inertiajs/react";
import {
  CreditCardIcon,
  TrashIcon,
  WalletIcon,
} from '@heroicons/react/24/outline';
import CurrencyFormater from "@/utils/CurrencyFormater";
import Midtrans from "@/lib/midtrans";
import { useEffect } from "react";
import Swal from "sweetalert2";

export default function Checkout({ cart }) {
  const { data, setData, post, processing, errors } = useForm({
    billing_email: "",
    shipping_first_name: "",
    shipping_last_name: "",
    shipping_email: "",
    shipping_address: "",
    shipping_city: "",
    shipping_postal_code: "",
    shipping_phone: "",
  });

  useEffect(() => {
    Midtrans.load();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Checkout Keranjang Belanja",
      text: "Apakah anda yakin ingin melanjutkan pembayaran?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Lanjutkan",
    }).then((result) => {
      if (result.isConfirmed) {
        // Midtrans.snapLoading();
        post(route("cart.checkout"), {
          preserveScroll: true,
          preserveState: true,
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
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2 bg-base-200 p-8 rounded-lg shadow-lg">
          <section className="space-y-8">
            <div className="border-b pb-4 border-base-300">
              <h3 className="text-lg font-bold">Contact Information</h3>
              <Input
                label="Email"
                name="billing_email"
                type="email"
                placeholder="e.g email@gmail.com"
                value={data.billing_email}
                handleChange={(e) => setData("billing_email", e.target.value)}
                errors={errors.billing_email}
                className="input-bordered"
              />
            </div>
            <div>
              <h3 className="text-lg font-bold">Shipping Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  name="shipping_first_name"
                  type="text"
                  value={data.shipping_first_name}
                  handleChange={(e) => setData("shipping_first_name", e.target.value)}
                  errors={errors.shipping_first_name}
                  placeholder="e.g Bambang Ganteng"
                  className="input-bordered"
                />
                <Input
                  label="Last Name"
                  name="shipping_last_name"
                  type="text"
                  value={data.shipping_last_name}
                  handleChange={(e) => setData("shipping_last_name", e.target.value)}
                  errors={errors.shipping_last_name}
                  placeholder="e.g Bambang Ganteng"
                  className="input-bordered"
                />
              </div>
              <Input
                label="Email"
                name="shipping_email"
                type="email"
                value={data.shipping_email}
                handleChange={(e) => setData("shipping_email", e.target.value)}
                errors={errors.shipping_email}
                placeholder="e.g test@test.com"
                className="input-bordered"
              />
              <Input
                label="Address"
                name="shipping_address"
                type="text"
                value={data.shipping_address}
                handleChange={(e) => setData("shipping_address", e.target.value)}
                errors={errors.shipping_address}
                placeholder="e.g Jln. Jalan"
                className="input-bordered"
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="City"
                  name="shipping_city"
                  type="text"
                  value={data.shipping_city}
                  handleChange={(e) => setData("shipping_city", e.target.value)}
                  errors={errors.shipping_city}
                  placeholder="e.g Yogyakarta"
                  className="input-bordered"
                />
                <Input
                  label="Postal Code"
                  name="postal_code"
                  type="text"
                  value={data.shipping_postal_code}
                  handleChange={(e) => setData("shipping_postal_code", e.target.value)}
                  errors={errors.shipping_postal_code}
                  placeholder="e.g 110102"
                  className="input-bordered"
                />
              </div>
              <Input
                label="Phone"
                name="shipping_phone"
                type="text"
                value={data.shipping_phone}
                handleChange={(e) => setData("shipping_phone", e.target.value)}
                errors={errors.shipping_phone}
                placeholder="e.g 0812345678"
                className="input-bordered"
              />
            </div>
          </section>
          <section className="space-y-4">
            <h3 className="text-lg font-bold">Order Summary</h3>
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
                    <span className="text-sm">{CurrencyFormater(item.price)}</span>
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
                    <span className="font-semibold">{CurrencyFormater(cart.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Discount</span>
                    <span className="font-semibold">{CurrencyFormater(cart.discount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Taxes</span>
                    <span className="font-semibold">{CurrencyFormater(cart.tax)}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">{CurrencyFormater(cart.total)}</span>
                </div>
              </div>
              <div className="p-8">
                <Button
                  type="submit"
                  disabled={processing}
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
      </form>

    </AuthenticatedLayout>
  );
}
