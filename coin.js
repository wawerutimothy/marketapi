const Axios = require("axios");
const mongoose = require('mongoose');

const options = {
    method: "GET",
    url: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
    headers: {
        
        },
    };
mongoose.connect("mongodb://localhost:27017/tim",
{useNewUrlParser: true},
function (err) {
    if(err) throw err;
    console.log("connection successful")
}
);
Axios.request(options).then(function(response) {
    onSuccess(response)
}).catch(function(error) {
    console.log(error);
});

const coinSchema = mongoose.Schema({
    name: {
        type: String,
    },
    price: {
        type: String,
    },
    volume_24h: {
        type: String,
    }
});
const coinData = mongoose.model("coindata", coinSchema);
//async(req, res) => {
function onSuccess(response) {
    //const { name, price, volume_24h } = req.body;
    const json  = response.data;
    const array = json;
    const arrayLength = Object.keys(array).length;
    console.log(arrayLength);
    for (i = 0; i <= arrayLength; i++) {
        const name = array.data[i].name;
        const price = array.data[i].price;
        const volume_24h = array.data[i].volume_24h;

        assignDataValue(name, price, volume_24h);
    }
    }

    function assignDataValue(name, price, volume_24h) {
    const uploadCoins = new coinData();
    uploadCoins.name = name;
    uploadCoins.price = price;
    uploadCoins.volume_24h = volume_24h;

    uploadCoins.save();
    }
