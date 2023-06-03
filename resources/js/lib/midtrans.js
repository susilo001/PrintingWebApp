import { router } from "@inertiajs/react";
import Swal from "sweetalert2";

const Midtrans = {
  load() {
    const MidtransScriptUrl = import.meta.env.VITE_MIDTRANS_SCRIPT_URL;
    const MidtransClientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;

    let scriptTag = document.createElement("script");
    scriptTag.src = MidtransScriptUrl;
    scriptTag.setAttribute("data-client-key", MidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  },

  snapLoading() {
    window.snap.show();
  },

  snapPay(snapToken) {
    window.snap.pay(snapToken, {
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
  },
};

export default Midtrans;
