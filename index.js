const Axios  = require('axios');


const options = {
    method: "GET",
    url: "https://api.simpleswap.io/get_market_info",
    headers: {
        
        "accept": "application/json",
    },
};

Axios.request(options)
    .then(function (response) {
        console.log((response));
    })
    .catch(function (error) {
        console.log(error);
    });
