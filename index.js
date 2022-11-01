const Axios  = require('axios');


const options = {
    method: "GET",
    url: "https://api.simpleswap.io/get_market_info",
    headers: {
        "api-Key": "634fa29a31493230724c11cf",
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
