import Alert from "./sweetalert";

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

  snapPay(snapToken) {
    window.snap.pay(snapToken, {
      onSuccess: function (result) {
        Alert("success", "Success", result.status_message);
      },
      onPending: function (result) {
        Alert("info", "Pending", result.status_message);
      },
      onError: function (result) {
        Alert("error", "Error", result.status_message, 'cart.index', "get");
      },
      onClose: function () {
        Alert("error", "Error", "You have cancelled the payment", 'cart.index', "get");
      },
    });
  },
};

export default Midtrans;
