const axios = require('axios');
const cryptoRaw = require("./lib/cryptocurrencies.json")
const crypto = Object.keys(cryptoRaw).map(key => key.toLowerCase());

const currencyFromCrypto = document.getElementById("currency-from-crypto");
const currencyFromCryptoSelect = document.getElementById("currency-from-crypto-select");
const currencyFromNormal = document.getElementById("currency-from-normal");
const currencyFromNormalSelect = document.getElementById("currency-from-normal-select");

const currencies = {
    crypto: {name: "Cryptocurrencies", data: []},
    normal: {name: "Normal Currencies", data: []}
}

let selectedType = "normal"

function customLog(message) {
    document.getElementById('console-log').innerHTML += message + '<br>';
}


window.addEventListener('DOMContentLoaded', () => {

    axios.get("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.min.json")
        .then(res => {
            for (const [key, value] of Object.entries(res.data)) {
                if (crypto.includes(key.toLowerCase())) {
                    const el = document.createElement("option");
                    el.textContent = value || key;
                    el.value = key;
                    currencyFromCryptoSelect.appendChild(el);
                    currencies.crypto.data.push({key, value})
                } else {
                    const el = document.createElement("option");
                    el.textContent = value || key;
                    el.value = key;
                    currencyFromNormalSelect.appendChild(el);
                    currencies.normal.data.push({key, value})
                }
            }
        })


    applyCurrencyType()

    console.log(currencies)
    /*            for (const [key, value] of Object.entries(res.data)) {
                    const el = document.createElement("option");
                    el.textContent = value || key;
                    el.value = key;
                    currencyFrom.appendChild(el);
                }*/

});

function applyCurrencyType() {
    switch (selectedType) {
        case "normal":
            currencyFromNormal.style.display = "block";
            currencyFromCrypto.style.display = "none";
            break;
        case "crypto":
            currencyFromNormal.style.display = "none";
            currencyFromCrypto.style.display = "block";
            break;
    }
}

document.getElementById("currency-type")
    .addEventListener("change", (e) => {
        selectedType = e.target.value;
        applyCurrencyType()
    })