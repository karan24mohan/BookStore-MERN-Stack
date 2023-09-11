const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: "String",
    author: "String",
    publishedYear: "Number",
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("books", bookSchema);
