import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/inertia-react";

export default function Cart({ cart, auth, cartCount }) {
  console.log(cart);
  return (
    <AuthenticatedLayout
      auth={auth}
      cartCount={cartCount}
      header={
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Cart #</h1>
        </div>
      }
    >
      <Head title="Cart" />
      <div className="max-w-7xl mx-auto px-8">Cart</div>
    </AuthenticatedLayout>
  );
}
