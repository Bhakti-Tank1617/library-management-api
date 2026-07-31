const { body} = require("express-validator");

const bookValidation = [
    book("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required"),

        body("author")
        .trim()
        .notEmpty()
        .withMessage("Author is required"),

        body("category")
        .trim()
        .notEmpty()
        .withMessage("Category is required"),

        body("publishedYear")
        .isInt({min:1000})
        .withMessage("Enter a valid published year"),

        body("totalCopies")
        .isInt({min:1})
        .withMessage("total copies must be at least 1"),

        body("availableCopies")
        .isInt({ min:1 })
        .withMessage("Available copies cannot be negative")
];

module.exports = { bookValidation };