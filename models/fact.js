const mongoose = require("mongoose");

const factSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  facts: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Fact", factSchema);
