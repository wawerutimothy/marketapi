const Axios = require('axios');
const mongoose = require('mongoose');
const express = require('express')

mongoose.connect(
    "mongodb://localhost:27017/<name of db>",// input name of your db
    { useNewUrlParser: true },
    function (err) {
        if (err) throw err;
        console.log(" Connection successful");
    }
);
{/*}
let response = null;
new Promise(async (resolve, reject) => {
    try {
            response = await Axios.get(
            "https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
            {
                headers: {
                "X-CMC_PRO_API_KEY": "3cf444b3-fb0c-4bce-891d-9077fc07d533",
                },
            }
        );
    } catch (ex) {
        response = null;
        // error
        console.log(ex);
        reject(ex);
    }
    if (response) {
        // success
        const json = response.data;
        console.log(json);
        resolve(json);
    }
    });
*/
}
// const options goes under here

Axios.request(options)
    .then(function (response) {
        onSuccess(response);
    })
    .catch(function (error) {
        console.log(error);
    });

const marketApiSchema = mongoose.Schema({
    id: {
        type: String,
    },
    name: {
        type: String,
    },
    symbol: {
        type: String,
    },
    //token name
    slug: {
        type: String,
    },
    price: {
        type: String,
    }
})
const marketdata = mongoose.model("marketapidata", marketApiSchema);

const onSuccess = async(req, res, response) => {
    const array = response;
    const arrayLength = Object.keys(array).length;
    console.log(arrayLength);
    const { name, symbol, slug, price } = req.body;
    for(i=0; i <= arrayLength; i++) {
        
        const name = array.data[i].name;
        const symbol = array.data[i].symbol;
        const slug = array.data[i].slug;
        const price = array.data[i].price;

        assignValue(
            name,
            symbol,
            slug,
            price
        )
    }
}
function assignValue(
    name, symbol, slug, price
){
    const uploadValues = new marketdata();
    uploadValues.name = name;
    uploadValues.symbol = symbol;
    uploadValues.slug= slug;
    uploadValues.price = price;

    uploadValues.save()
}
