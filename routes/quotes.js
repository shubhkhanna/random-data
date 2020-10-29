const express = require("express");

const router = express.Router(); //Define routes
const mongoose = require("mongoose");
const Quote = require("../models/quote");

router.get("/", (req, res, next) => {
  // GET A RANDOMN Quote
  Quote.countDocuments().exec((err, count) => {
    var random = Math.floor(Math.random() * count);

    Quote.findOne()
      .skip(random)
      .exec()
      .then((result) => {
        console.log(result);
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
});

//POST a Quote
router.post("/", (req, res, next) => {
  //create instance of that quote
  const quote = new Quote({
    _id: new mongoose.Types.ObjectId(),
    quotes: req.body.quotes,
    writer: req.body.writer,
  });
  quote
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "POST request works",
        createdQuote: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

//Delete a particular quote
router.delete("/:quotesId", (req, res, next) => {
  const id = req.params.quotesId;
  Quote.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
