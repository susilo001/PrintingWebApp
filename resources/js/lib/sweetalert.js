import { router } from "@inertiajs/react";
import Swal from "sweetalert2";

const Alert = (icon, title, text, route, method) => {
  Swal.fire({
    icon: icon,
    title: title,
    text: text,
  }).then((result) => {
    if (result.isConfirmed) {
      router.visit(route(route), {
        method: method,
      })
    }
  });
};

export default Alert;
