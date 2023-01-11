export default function CurrencyFormater(value) {
  if (typeof value === "string") {
    value = parseInt(value);
  }

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(value);
}
