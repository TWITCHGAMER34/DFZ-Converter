const axios = require('axios');
const crypto = require('./lib/crypto.json');
const country = require('./lib/country-by-currency-code.json');

const currencyFromCrypto = document.getElementById("currency-from-crypto");
const currencyFromCryptoSelect = document.getElementById("currency-from-crypto-select");
const currencyFromNormal = document.getElementById("currency-from-normal");
const currencyFromNormalSelect = document.getElementById("currency-from-normal-select");
const currencyToNormal = document.getElementById("currency-to-normal");
const currencyToCrypto = document.getElementById("currency-to-crypto");
const currencyToCryptoSelect = document.getElementById("currency-to-crypto-select");
const currencyToNormalSelect = document.getElementById("currency-to-normal-select");

const currencies = {
    crypto: {name: "Cryptocurrencies", data: []},
    normal: {name: "Normal Currencies", data: []}
}

let selectedType = "normal"

function customLog(message) {
    document.getElementById('console-log').innerHTML += message + '<br>';
}




window.addEventListener('DOMContentLoaded', () => {


    for (const item of crypto) {
        const el = document.createElement("option");
        el.textContent = item.name || item.currency_code;
        el.value = item.name;
        currencyFromCryptoSelect.appendChild(el);
        currencyToCryptoSelect.appendChild(el.cloneNode(true));
        currencies.crypto.data.push(item)
    }

    for (const item of country) {
        const el = document.createElement("option");
        el.textContent = item.name || item.currency_code;
        el.value = item.name;
        currencyFromNormalSelect.appendChild(el);
        currencyToNormalSelect.appendChild(el.cloneNode(true));
        currencies.normal.data.push(item)
    }
    applyCurrencyType()

});

function applyCurrencyType() {
    switch (selectedType) {
        case "normal":
            currencyFromNormal.style.display = "block";
            currencyFromCrypto.style.display = "none";
            currencyToNormal.style.display = "block";
            currencyToCrypto.style.display = "none";
            break;
        case "crypto":
            currencyFromNormal.style.display = "none";
            currencyFromCrypto.style.display = "block";
            currencyToNormal.style.display = "none";
            currencyToCrypto.style.display = "block";
            break;
    }
}

document.getElementById("currency-type")
    .addEventListener("change", (e) => {
        selectedType = e.target.value;
        applyCurrencyType()
    })