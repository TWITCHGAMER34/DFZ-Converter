// Import required modules and files
const crypto = require('./lib/crypto.json');
const country = require('./lib/country-by-currency-code.json');
const {exchangeCurrency} = require("./exchangeCurrency");

// Get DOM elements
const currencyFromCrypto = document.getElementById("currency-from-crypto");
const currencyFromCryptoSelect = document.getElementById("currency-from-crypto-select");
const currencyFromNormal = document.getElementById("currency-from-normal");
const currencyFromAll = document.getElementById("currency-from-all");
const currencyFromNormalSelect = document.getElementById("currency-from-normal-select");
const currencyToNormal = document.getElementById("currency-to-normal");
const currencyToCrypto = document.getElementById("currency-to-crypto");
const currencyToAll = document.getElementById("currency-to-all");
const currencyToCryptoSelect = document.getElementById("currency-to-crypto-select");
const currencyToNormalSelect = document.getElementById("currency-to-normal-select");
const currencyFromAllSelect = document.getElementById("currency-from-all-select");
const currencyToAllSelect = document.getElementById("currency-to-all-select");
const convertButton = document.getElementById("convert-button");
const amount = document.getElementById("amount");
const result = document.getElementById("result");

// Initialize currencies object
const currencies = {
    crypto: {name: "Cryptocurrencies", data: []},
    normal: {name: "Normal Currencies", data: []}
}

// Set the default currency type
let selectedType = "normal"

// Populate the select elements with the currency codes from the JSON files
window.addEventListener('DOMContentLoaded', () => {
    for (const item of crypto) {
        const el = document.createElement("option");
        el.textContent = item.name || item.currency_code;
        el.value = item.currency_code;
        currencyFromCryptoSelect.appendChild(el);
        currencyToAllSelect.appendChild(el.cloneNode(true));
        currencyFromAllSelect.appendChild(el.cloneNode(true));
        currencyToCryptoSelect.appendChild(el.cloneNode(true));
        currencies.crypto.data.push(item)
    }

    for (const item of country) {
        const el = document.createElement("option");
        el.textContent = item.name || item.currency_code;
        el.value = item.currency_code;
        currencyFromNormalSelect.appendChild(el);
        currencyFromAllSelect.appendChild(el.cloneNode(true));
        currencyToAllSelect.appendChild(el.cloneNode(true));
        currencyToNormalSelect.appendChild(el.cloneNode(true));
        currencies.normal.data.push(item)
    }
    applyCurrencyType();
});

// Add event listener to the convert button
convertButton.addEventListener("click", async () => {
    let from, to;

    if (selectedType === "normal") {
        from = currencyFromNormalSelect.value;
        to = currencyToNormalSelect.value;
    } else if (selectedType === "all") {
        from = currencyFromAllSelect.value;
        to = currencyToAllSelect.value;
    } else {
        from = currencyFromCryptoSelect.value;
        to = currencyToCryptoSelect.value;
    }

    const amountValue = amount.value;
    const money = await exchangeCurrency(from, to, amountValue);
    result.textContent = `${amountValue} ${from} = ${money.toFixed(1)} ${to}`;
})

/**
 * This function applies the selected currency type.
 */
function applyCurrencyType() {
    /*
    * Hide and show the currency conversion elements
    * based on the selected currency type
    * */
    switch (selectedType) { // More advanced if-statement
        // Hide and show the currency conversion elements based on the selected currency type
        case "normal":
            currencyFromNormal.style.display = "block";
            currencyFromCrypto.style.display = "none";
            currencyToNormal.style.display = "block";
            currencyToCrypto.style.display = "none";
            currencyFromAll.style.display = "none";
            currencyToAll.style.display = "none";
            break;
        case "crypto":
            currencyFromNormal.style.display = "none";
            currencyFromCrypto.style.display = "block";
            currencyToNormal.style.display = "none";
            currencyToCrypto.style.display = "block";
            currencyToAll.style.display = "none";
            currencyFromAll.style.display = "none";
            break;
        case "all":
            currencyFromNormal.style.display = "none";
            currencyFromCrypto.style.display = "none";
            currencyToNormal.style.display = "none";
            currencyToCrypto.style.display = "none";
            currencyFromAll.style.display = "block";
            currencyToAll.style.display = "block";
            break;
    }
}

// Add event listener to the currency type select element
document.getElementById("currency-type")
    .addEventListener("change", (e) => {
        selectedType = e.target.value;
        applyCurrencyType()
    })
