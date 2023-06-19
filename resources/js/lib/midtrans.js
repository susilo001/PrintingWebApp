import Alert from "./sweetalert";
import { router } from "@inertiajs/react";

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

  snapLoadingHide() {
    window.snap.hide();
  },

  snapPay(snapToken, orderId) {
    window.snap.pay(snapToken, {
      onSuccess: function (result) {
        Alert("success", "Success", result.status_message);
      },
      onPending: function (result) {
        Alert("info", "Pending", result.status_message);
      },
      onError: function (result) {
        alert(result.status_message);
        router.delete(route('order.destroy', orderId));
      },
      onClose: function () {
        alert("Transaction Canceled");
        router.delete(route('order.destroy', orderId));
      },
    });
  },
};

export default Midtrans;
