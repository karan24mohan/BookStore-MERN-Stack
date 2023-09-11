const express = require("express");
const bookSchema = require("../models/booksSchema");

const router = express.Router();

// Route to get all books from database
router.get("/", async (req, resp) => {
  try {
    const allBooks = await bookSchema.find();
    console.log(allBooks);
    resp.status(200).json({
      count: allBooks.length,
      data: allBooks,
    });
  } catch (error) {
    resp.status(500).json({ message: error.message });
  }
});

// Route to save a new book
router.post("/book/create", async (req, resp) => {
  console.log(req.body);

  try {
    if (
      req.body.title == "" ||
      req.body.author == "" ||
      req.body.publishedYear == ""
    ) {
      return resp.status(400).json({ message: "Send all the required fields" });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishedYear: req.body.publishedYear,
    };
    const data = new bookSchema(newBook);
    const result = await data.save();
    resp.status(200).json({
      message: result,
    });
  } catch (error) {
    resp.status(500).json({ message: error.message });
  }
});

// Route to get one book details
router.get("/book/:id", async (req, resp) => {
  try {
    const particularBook = await bookSchema.findOne({ _id: req.params.id });
    console.log(particularBook);
    resp.status(200).json({
      data: particularBook,
    });
  } catch (error) {
    resp.status(500).json({
      message: error.message,
    });
  }
});

// Route to update one particular book
router.put("/book/edit/:id", async (req, resp) => {
  try {
    const result = await bookSchema.findByIdAndUpdate(
      { _id: req.params.id },
      req.body
    );
    if (!result) {
      resp.status(404).json({
        message: "Book not found",
      });
    } else {
      resp.status(200).json({
        message: "Updated",
      });
    }
  } catch (error) {
    resp.status(500).json({
      message: error.message,
    });
  }
});

// Route to delete one particular book
router.delete("/book/deleteBook/:id", async (req, resp) => {
  try {
    const result = await bookSchema.findOne({ _id: req.params.id });
    if (!result) {
      resp.status(404).json({
        message: "Book not found, hence can't be deleted",
      });
    } else {
      const data = result.deleteOne();
      resp.status(200).json({
        message: "Book Deleted",
        data: data,
      });
    }
  } catch (error) {
    resp.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
