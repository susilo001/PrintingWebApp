export default function CurrencyFormater(value) {
  FormatStringtoInteger(value);

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(value);
}

function FormatStringtoInteger(value) {
  if (typeof value === "string") {
    value = parseInt(value);
  }

  return value;
}
