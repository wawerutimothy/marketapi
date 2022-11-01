const Axios = require("axios");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

mongoose.connect(
    "mongodb://localhost:27017/Market",
    { useNewUrlParser: true },
    function (err) {
        if (err) throw err;
        console.log(" Connection successful");
    }
);
let response = null;
new Promise(async (resolve, reject) => {
    try {
        response = await Axios.get(
        "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
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
        console.log(json[0]);
        resolve(json);
    }
    });

const marketApiSchema = mongoose.Schema({
    
    coins: [
        {
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
        },
        volumeChange: {
            type: Number,
        },
        },
    ],
    });
async(req, res) => {
    const { coins, name, price } = req.body;
    const newCoins = {
        coins,
        name,
        price,
        volumeChange,
    };
    const inputCoins = JSON.parse(body);
    const quote = inputCoins["quote"];
    newCoins.name = quote["01. name"];
    newCoins.price = quote["02. price"];
    newCoins.volumeChange = quote["03. volume_24hr"];

    marketApiSchema.coins.insert(newCoins);
    await marketApiSchema.save();
    res.status(200).json({
        success: true,
        message: "saved",
    });
}



