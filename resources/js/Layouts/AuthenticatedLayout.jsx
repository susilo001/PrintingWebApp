import Alert from "@/Components/Alert";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { usePage } from "@inertiajs/react";
import Footer from "@/Components/Footer";
import NavBar from "@/Components/NavBar";
import Midtrans from "@/lib/midtrans";
import { useEffect } from "react";

export default function Authenticated({ header, children }) {
  const { flash, errors } = usePage().props;

  useEffect(() => {
    if (flash.invoice) {
      window.open(flash.invoice, "_blank")
    }

    const loadMidtrans = async () => {
      try {
        await Midtrans.load();
        const { token } = flash || {};

        if (token && token.snap_token && token.order_id) {
          await Midtrans.snapPay(token.snap_token, token.order_id);
        }
      } catch (error) {
        alert('Error in Midtrans integration:', error);
      }
    };

    loadMidtrans();
  }, [flash]);

  return (
    <div className="relative flex min-h-screen flex-col">

      {/* Navigation Bar */}
      <NavBar />

      {/* Page Content */}
      <div className="flex-grow">
        {header && (
          <header className="mt-16 shadow">
            <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
              {header}
            </div>
          </header>
        )}

        {/* Alert  */}
        {flash?.status && <Alert status={flash.status} message={flash.message} />}


        {/* Validation Errors */}
        {errors && Object.keys(errors).length !== 0 && (
          <div className="mx-auto mt-4 max-w-7xl px-4 sm:px-6 lg:px-8 space-y-2 w-full">
            {Object.values(errors).map((error, index) => (
              <div key={index} className="alert alert-error">
                <XCircleIcon className="h-6 w-6" /> <span>{error}</span>
              </div>
            ))}
          </div>
        )}

        <main className="container m-auto my-12 max-w-7xl space-y-16 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
