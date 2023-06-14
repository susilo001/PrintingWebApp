const Currency = {
    FormatStringToInteger(value) {
        if (typeof value === "string") {
            return parseInt(value);
        }
        return value;
    },

    getCurrencyFormat(value) {
        value = this.FormatStringToInteger(value);

        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(value);
    },

    getPrice(prices) {
        const sortedPrices = prices.sort((a, b) => a.min_order - b.min_order);

        const price = sortedPrices[0].price;

        return this.getCurrencyFormat(price);
    },
};

export default Currency;
