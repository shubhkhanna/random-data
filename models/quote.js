const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  quotes: {
    type: String,
    required: true,
  },
  writer: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Quote", quoteSchema);
