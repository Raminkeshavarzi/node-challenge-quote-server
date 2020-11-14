// server.js
// This is where your node app starts

//load the 'express' module which makes writing webservers easy
const express = require("express");
const lodash = require('lodash');
var cors = require('cors');
const app = express();

app.use(cors());



//load the quotes JSON
const quotes = require("./quotes.json");

// Now register handlers for some routes:
//   /                  - Return some helpful welcome info (text)
//   /quotes            - Should return all quotes (json)
//   /quotes/random     - Should return ONE quote (json)
app.get("/", function (req, res, next) {
  res.send("Neill's Quote Server!  Ask me for /quotes/random, or /quotes");
});

//START OF YOUR CODE...
app.get("/quotes", (req, res, next) => {
  res.send(quotes);
});

app.get("/quotes/random", (req, res, next) => {
  res.send(lodash.sample(quotes));
})

app.get("/search", (req, res, next) => {
  let word = req.query.term;
  res.send(search(word, quotes));
});

// search logic
const search = (term, arr) => {
  return (
    arr.filter((item) => {
      if (item.quote.includes(term)) {
        return true;
      }
    })
  );
}
//...END OF YOUR CODE

//You can use this function to pick one element at random from a given array
//example: pickFromArray([1,2,3,4]), or
//example: pickFromArray(myContactsArray)
//
function pickFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

//Start our server so that it listens for HTTP requests!
 app.listen(3000);


