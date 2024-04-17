window.addEventListener('DOMContentLoaded', () => {
    const axios = require('axios');

    function customLog(message) {


        document.getElementById('console-log').innerHTML += message + '<br>';
    }

    axios.get('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json')
        .then(response => {
            customLog(JSON.stringify(response.data, null, 2));
        })
        .catch(error => {
            customLog(error);
        });
});