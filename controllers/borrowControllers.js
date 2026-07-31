const Borrow = require("../models/Borrow");
const Book = require("../models/Book");

const borrowBook = async (req,res) => {
  
    try{
        const userId = req.user.id;
        const bookId = req.params.bookId;

        // Check if book exists
        const book = await Book.findById(bookId);

        if(!book)
        {
            return res.status(404).json({
                success:false,
                message:"Book not Found"
            });
        }
   // Check if book is available

     if(book.availableCopies <= 0)
        {
            return res.status(400).json({
                success:false,
                message:"Book is not Available"
            });
        }

  // Check if user has already borrowed this book

  const alreadyBorrowed = await Borrow.findOne({
    user:userId,
    book:bookId,
    status:"borrowed"
  });

  if(alreadyBorrowed) {
    return res.status(400).json({
        success:false,
        message:"You have already Borrowed this book "
    });
  }

     // Set due date (14 days from today)
     const dueDate = new Date();
     dueDate.setDate(dueDate.getDate()+14);

     //create Borrow Record
     const borrow = await Borrow.create({
        user : userId,
        book:bookId,
        dueDate : dueDate
     });

     //decrease avsilable copies
     book.availableCopies -= 1;
     await book.save();

     res.status(201).json({
        success:true,
        message:"Book Borrowed Successfully.",
        data: borrow
     });
    } catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    };
}

const returnBook = async (req,res) => {
  try {
    const userId = req.user.id;
    const bookId = req.params.bookId;

    //check borrow record
    const borrow = await Borrow.findOne({
        user:userId,
        book:bookId,
        status:"borrowed"
    });

    if(!borrow)
    {
        return res.status(404).json({
            success:false,
            message:"NO active Borrow Record Found"
        });
    }

    const book = await Book.findById(bookId);

    if(!book) {
         return res.status(404).json({
        success: false,
        message: "Book not found"
    });
}

    //update borrow record
    borrow.status ="returned";
    borrow.returnDate = new Date();

    //increase the availabe copies
    book.availableCopies++;

    //save changes
    await borrow.save();
    await book.save();

    res.status(200).json({
        success:true ,
        message:"Book returned Successfully",
        data:borrow
    });
  } catch (error) {
    res.status(500).json({
        success:false,
        message : error.message
    });
  }
};

module.exports = {
    borrowBook,
    returnBook
}
