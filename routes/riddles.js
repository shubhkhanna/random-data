const express = require("express");

const router = express.Router(); //Define routes
const mongoose = require("mongoose");
const Riddle = require("../models/riddle");

router.get("/", (req, res, next) => {
  // GET A RANDOMN Riddle
  Riddle.countDocuments().exec((err, count) => {
    var random = Math.floor(Math.random() * count);

    Riddle.findOne()
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

//POST a Riddle
router.post("/", (req, res, next) => {
  //create instance of that riddle
  const riddle = new Riddle({
    _id: new mongoose.Types.ObjectId(),
    question: req.body.question,
    answer: req.body.answer,
  });
  riddle
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "POST request works",
        createdFact: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

//Delete a particular riddle
router.delete("/:riddlesId", (req, res, next) => {
  const id = req.params.riddlesId;
  Riddle.remove({ _id: id })
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
