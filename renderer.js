window.addEventListener('DOMContentLoaded', () => {
    const axios = require('axios');

    function customLog(message) {
        console.log(message); // This will log the message to the console

        // This will append the message to the 'console-log' div in your HTML
        document.getElementById('console-log').innerHTML += message + '<br>';
    }

    axios.get('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json')
        .then(response => {
            customLog(JSON.stringify(response.data)); // This will log the data returned by the API to the console and the HTML
            console.log(response.data);
        })
        .catch(error => {
            customLog(error); // This will log any error that occurs during the request to the console and the HTML
            console.log(error);
        });
});