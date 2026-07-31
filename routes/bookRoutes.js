const express = require("express");
const {createBook, getAllBooks, getBookByID, updateBook, deleteBook} = require("../controllers/bookController");


// router.get("/",getAllBooks);

// router.get("/:id" , getBookById);

const protect = require("../middleware/authMiddleware");

const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
       "/",
       protect,
       authorize("admin" , "librarian"),
       createBook
);

router.get(
       "/",
       protect,
       getAllBooks   
)

router.get("/:id" , protect , getBookByID);

router.put("/:id" , protect , authorize("admin" , "librarian") , updateBook);

router.delete("/:id" , protect , authorize("admin") , deleteBook);

module.exports = router;