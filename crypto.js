const fs = require("fs");
const axios = require('axios');
const { parse } = require("csv-parse");


// Given no parameters, return the latest portfolio value per token in USD
var getLatestPortfolioTokensUSD = function() {
    var btcPortfolio = {"token" : "BTC", "amount" : 0, "timestamp" : 0};
    var ethPortfolio = {"token" : "ETH", "amount" : 0, "timestamp" : 0};
    var xrpPortfolio = {"token" : "XRP", "amount" : 0, "timestamp" : 0};

    fs.createReadStream("./transactions.csv")
        .pipe(parse({ delimiter: ",", from_line: 2 }))
        .on("data", function (row) {
            //console.log(row);
            var jsonData = {};
            jsonData.timestamp = row[0];
            jsonData.transaction_type = row[1];
            jsonData.token = row[2];
            jsonData.amount = row[3];

            if(jsonData.token === 'BTC') {
                if(jsonData.timestamp > btcPortfolio.timestamp) {
                    btcPortfolio.amount = jsonData.amount;
                    btcPortfolio.timestamp = jsonData.timestamp;
                }
            }
            else if(jsonData.token === 'ETH') {
                if(jsonData.timestamp > ethPortfolio.timestamp) {
                    ethPortfolio.amount = jsonData.amount;
                    ethPortfolio.timestamp = jsonData.timestamp;
                }
            } 
            else if(jsonData.token === 'XRP') {
                if(jsonData.timestamp > xrpPortfolio.timestamp) {
                    xrpPortfolio.amount = jsonData.amount;
                    xrpPortfolio.timestamp = jsonData.timestamp;
                }
            }
        })
        .on("end", function () {
            var url = 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH,BTC,XRP&tsyms=USD&api_key=e6bd939c280cef5e12f3109253ee9a105ce939342e25acf1d454be50b9adbeb1';

            axios
            .get(url)
            .then(res => {
                btcPortfolio.amount = btcPortfolio.amount * res.data.BTC.USD;
                ethPortfolio.amount = ethPortfolio.amount * res.data.ETH.USD;
                xrpPortfolio.amount = xrpPortfolio.amount * res.data.XRP.USD;

                console.log(btcPortfolio);
                console.log(ethPortfolio);
                console.log(xrpPortfolio);
            })
            .catch(error => {
                console.error(error);
            });

            
        })
        .on("error", function (error) {
            console.log(error.message);
        });
}

//Given a token, return the latest portfolio value for that token in USD
const getGivenTokenLatestPortforlio = function(token) {

    var portfolio = {"token" : `${token}`, "amount" : 0, "timestamp" : 0};

    fs.createReadStream("./transactions.csv")
        .pipe(parse({ delimiter: ",", from_line: 2 }))
        .on("data", function (row) {
            //console.log(row);
            var jsonData = {};
            jsonData.timestamp = row[0];
            jsonData.transaction_type = row[1];
            jsonData.token = row[2];
            jsonData.amount = row[3];

            if(jsonData.token === token) {
                if(jsonData.timestamp > portfolio.timestamp) {
                    portfolio.amount = jsonData.amount;
                    portfolio.timestamp = jsonData.timestamp;
                }
            }
            
        })
        .on("end", function () {
            var url = 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH,BTC,XRP&tsyms=USD&api_key=e6bd939c280cef5e12f3109253ee9a105ce939342e25acf1d454be50b9adbeb1';

            axios
            .get(url)
            .then(res => {
                portfolio.amount = portfolio.amount * res.data.BTC.USD;

                console.log(portfolio);
            })
            .catch(error => {
                console.error(error);
            });

            
        })
        .on("error", function (error) {
            console.log(error.message);
        });
}

//Given a date, return the portfolio value per token in USD on that date
const getPortfolioFortokenOnDate = function(date) {
    var btcPortfolio = {"token" : "BTC", "amount" : 0};
    var ethPortfolio = {"token" : "ETH", "amount" : 0};
    var xrpPortfolio = {"token" : "XRP", "amount" : 0};

    fs.createReadStream("./transactions.csv")
        .pipe(parse({ delimiter: ",", from_line: 2 }))
        .on("data", function (row) {
            //console.log(row);
            var jsonData = {};
            jsonData.timestamp = row[0];
            jsonData.transaction_type = row[1];
            jsonData.token = row[2];
            jsonData.amount = row[3];

            //Convert date
            var dt = new Date(jsonData.timestamp * 1000);
            var dtCsv = dt.getDate() + '/' + (dt.getMonth() + 1) + '/' + dt.getFullYear();

            if(jsonData.token === 'BTC') {
                if(date === dtCsv) {
                    btcPortfolio.amount = jsonData.amount;
                }
            }
            else if(jsonData.token === 'ETH') {
                if(date === dtCsv) {
                    ethPortfolio.amount = jsonData.amount;
                }
            } 
            else if(jsonData.token === 'XRP') {
                if(date === dtCsv) {
                    xrpPortfolio.amount = jsonData.amount;
                }
            }
        })
        .on("end", function () {
            var url = 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH,BTC,XRP&tsyms=USD&api_key=e6bd939c280cef5e12f3109253ee9a105ce939342e25acf1d454be50b9adbeb1';

            axios
            .get(url)
            .then(res => {
                btcPortfolio.amount = btcPortfolio.amount * res.data.BTC.USD;
                ethPortfolio.amount = ethPortfolio.amount * res.data.ETH.USD;
                xrpPortfolio.amount = xrpPortfolio.amount * res.data.XRP.USD;

                console.log(btcPortfolio);
                console.log(ethPortfolio);
                console.log(xrpPortfolio);
            })
            .catch(error => {
                console.error(error);
            });

            
        })
        .on("error", function (error) {
            console.log(error.message);
        });
}

//Given a date and a token, return the portfolio value of that token in USD on that date
const getPortfolioOnTokenDate = function(date, token) {
    var portfolio = {"token" : `${token}`, "amount" : 0, "timestamp" : 0};

    fs.createReadStream("./transactions.csv")
        .pipe(parse({ delimiter: ",", from_line: 2 }))
        .on("data", function (row) {
            //console.log(row);
            var jsonData = {};
            jsonData.timestamp = row[0];
            jsonData.transaction_type = row[1];
            jsonData.token = row[2];
            jsonData.amount = row[3];

            //Convert date
            var dt = new Date(jsonData.timestamp * 1000);
            var dtCsv = dt.getDate() + '/' + (dt.getMonth() + 1) + '/' + dt.getFullYear();

            if(jsonData.token === token) {
                if(date === dtCsv) {
                    portfolio.amount = jsonData.amount;
                    portfolio.timestamp = jsonData.timestamp;
                }
            }
            
        })
        .on("end", function () {
            var url = 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH,BTC,XRP&tsyms=USD&api_key=e6bd939c280cef5e12f3109253ee9a105ce939342e25acf1d454be50b9adbeb1';

            axios
            .get(url)
            .then(res => {
                portfolio.amount = portfolio.amount * res.data.BTC.USD;

                console.log(portfolio);
            })
            .catch(error => {
                console.error(error);
            });

            
        })
        .on("error", function (error) {
            console.log(error.message);
        });
}

// Given no parameters, return the latest portfolio value per token in USD
getLatestPortfolioTokensUSD();

//Given a token, return the latest portfolio value for that token in USD
getGivenTokenLatestPortforlio('BTC');

//Given a date, return the portfolio value per token in USD on that date
getPortfolioFortokenOnDate('25/10/2019');

//Given a date and a token, return the portfolio value of that token in USD on that date
getPortfolioOnTokenDate('25/10/2019', 'BTC')