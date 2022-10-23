const Axios = require("axios");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const db = mongoose.connection;
const Portfolio = require("./apiModel");

const options = {
  method: "GET",
  url: "https://latest-stock-price.p.rapidapi.com/price",
  params: { Indices: "NIFTY 50" },
  headers: {
    "X-RapidAPI-Key": "1e7e7fdb3cmsh6160f981120e031p1df576jsn9a19dbf5dd32",
    "X-RapidAPI-Host": "latest-stock-price.p.rapidapi.com",
  },
};
mongoose.connect(
  "mongodb://localhost:27017/apidata",
  { useNewUrlParser: true },
  function (err) {
    if (err) throw err;
    console.log(" Connection successful");
  }
);
Axios.request(options)
  .then(function (response) {
    onSuccess(response);
  })
  .catch(function (error) {
    console.log(error);
  });

const apiSchema = mongoose.Schema({
  symbol: {
    type: String,
  },
  identifier: {
    type: String,
  },
  open: {
    type: String,
  },
  dayhigh: {
    type: String,
  },
  daylow: {
    type: String,
  },
  lastprice: {
    type: String,
  },
  previousclose: {
    type: String,
  },
  change: {
    type: String,
  },
  pchange: {
    type: String,
  },
  totaltradedvolume: {
    type: String,
  },
  lastupdatetime: {
    type: Date,
  },
  yearhigh: {
    type: String,
  },
  yearlow: {
    type: String,
  },
  perecentagechange365d: {
    type: String,
  },
  perecentagechange30d: {
    type: String,
  },
});
const Data = mongoose.model("Data", apiSchema);

function onSuccess(response) {
  const array = response;
  const arrayLength = Object.keys(array).length;
  console.log(arrayLength);
  for (i = 0; i <= arrayLength; i++) {
    const symbol = array.data[i].symbol;
    const identifier = array.data[i].identifier;
    const open = array.data[i].open;
    const dayhigh = array.data[i].dayhigh;
    const daylow = array.data[i].daylow;
    const lastprice = array.data[i].lastprice;
    const previousclose = array.data[i].previousclose;
    const pchange = array.data[i].pchange;
    const totaltradedvolume = array.data[i].totaltradedvolume;
    const totaltradedvalue = array.data[i].totaltradedvalue;
    const lastupdatetime = array.data[i].lastupdatetime;
    const yearhigh = array.data[i].yearhigh;
    const yearlow = array.data[i].yearlow;
    const percentagechange365d = array.data[i].percentagechange365d;
    const percentagechange30d = array.data[i].perecentagechange30d;
    assignDataValue(
      symbol,
      identifier,
      open,
      dayhigh,
      daylow,
      lastprice,
      previousclose,
      pchange,
      totaltradedvolume,
      totaltradedvalue,
      lastupdatetime,
      yearhigh,
      yearlow,
      percentagechange365d,
      percentagechange30d
    );
  }
}

function assignDataValue(
  symbol,
  identifier,
  open,
  dayhigh,
  daylow,
  lastprice,
  previousclose,
  pchange,
  totaltradedvolume,
  totaltradedvalue,
  lastupdatetime,
  yearhigh,
  yearlow,
  percentagechange365d,
  percentagechange30d
) {
  const uploadData = new Data();
  uploadData.symbol = symbol;
  uploadData.identifier = identifier;
  uploadData.open = open;
  uploadData.dayhigh = dayhigh;
  uploadData.daylow = daylow;
  uploadData.lastprice = lastprice;
  uploadData.previousclose = previousclose;
  uploadData.pchange = pchange;
  uploadData.totaltradedvolume = totaltradedvolume;
  uploadData.totaltradedvalue = totaltradedvalue;
  uploadData.lastupdatetime = lastupdatetime;
  uploadData.yearhigh = yearhigh;
  uploadData.yearlow = yearlow;
  uploadData.percentagechange365d = percentagechange365d;
  uploadData.percentagechange30d = percentagechange30d;

  uploadData.save();
}

{
  /*





const api = async() => {    
    const newApi = await Axios.request(options);  
    return newApi.data
    };
const print = async () => {
  const resp = await api();
  console.log(resp);
};    
print();
*/
}

//app.use(cors());

/*axios.get(options).then(function(response) {
    var dataResponse = response.data;
    console.log(dataResponse);
}).catch(function(error) {
    console.error(error)
})*/
