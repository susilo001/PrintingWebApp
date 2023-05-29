import { router } from "@inertiajs/react";
import Swal from "sweetalert2";

const SweetAlert = (icon, title, text, route) => {
  Swal.fire({
    icon: icon,
    title: title,
    text: text,
  }).then((result) => {
    if (result.isConfirmed) {
      router.get(route);
    }
  });
};

export default SweetAlert;
