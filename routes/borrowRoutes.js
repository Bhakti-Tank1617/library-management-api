const express = require("express");
 const router = express.Router();

const {borrowBook , returnBook} = require("../controllers/borrowControllers");

const protect = require("../middleware/authMiddleware")
const authorize = require("../middleware/roleMiddleware");

router.post(
    "/:bookId" ,
     protect ,
      authorize("student") ,
       borrowBook
    );

    router.put(
        "/return/:bookId" ,
        protect , 
        authorize("student"),
        returnBook
    );

    module.exports = router;
