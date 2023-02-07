const Midtrans = () => {
  const midtransScriptUrl = import.meta.env.VITE_MIDTRANS_SCRIPT_URL;

  const MidtransClientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;

  let scriptTag = document.createElement("script");
  scriptTag.src = midtransScriptUrl;

  scriptTag.setAttribute("data-client-key", MidtransClientKey);

  document.body.appendChild(scriptTag);
  return () => {
    document.body.removeChild(scriptTag);
  };
};

export default Midtrans;
