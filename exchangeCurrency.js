const axios = require("axios")


async function exchangeCurrency(currencyCodeFrom, currencyCodeTo, amount) {
    console.log(currencyCodeTo, currencyCodeFrom, amount)
    // Find the corresponding country for the given currency code
    const codeFrom = currencyCodeFrom.toString().toLowerCase();
    const codeTo = currencyCodeTo.toString().toLowerCase();

    // Check if the exchange rate is already stored in the local storage
    if (localStorage.getItem(codeFrom)) {
        const response = JSON.parse(localStorage.getItem(codeFrom));
        return response[codeFrom][codeTo] * amount;
    }
    // Send a GET request to the currency exchange API
    const response = await axios.get(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${codeFrom}.json`)
        .then(res => res.data);

    localStorage.setItem(codeFrom, JSON.stringify(response));

    // Calculate the exchanged amount
    const exchangeRate = response[codeFrom][codeTo];

    return amount * exchangeRate;
}

module.exports = {exchangeCurrency};