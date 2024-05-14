const axios = require("axios")

/**
 * This function exchanges one currency to another.
 * @param {string} currencyCodeFrom - The currency code to convert from.
 * @param {string} currencyCodeTo - The currency code to convert to.
 * @param {number} amount - The amount to convert.
 * @returns {Promise<number>} The converted amount.
 */
async function exchangeCurrency(currencyCodeFrom, currencyCodeTo, amount) {
    // Convert the currency codes to lowercase
    const codeFrom = currencyCodeFrom.toString().toLowerCase();
    const codeTo = currencyCodeTo.toString().toLowerCase();

    // Check if the exchange rate is already stored in the local storage
    if (localStorage.getItem(codeFrom)) {
        const response = JSON.parse(localStorage.getItem(codeFrom));
        // Return the converted amount using the stored exchange rate
        return response[codeFrom][codeTo] * amount;
    }
    // Send a GET request to the currency exchange API
    const response = await axios.get(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${codeFrom}.json`)
        .then(res => res.data);
    // Store the exchange rate in the local storage
    localStorage.setItem(codeFrom, JSON.stringify(response));

    // Calculate the exchanged amount
    const exchangeRate = response[codeFrom][codeTo];

    return amount * exchangeRate;
}

module.exports = {exchangeCurrency};