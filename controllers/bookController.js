const { query } = require("../app");
const Book = require("../models/Book");


// const getBookById = (req , res) => {
//   const id = req.params.id;

//   res.send(`Book id : ${id}`); 
// };

const createBook = async(req,res)=> {
  try {
    const book = await Book.create(req.body);

    res.status(201).json({
      success:true,
      message:"Book Added Successfully",
      data : book
    });
  } catch(error) {
    res.status(400).json({
      success:false,
      message: error.message
    });
  }
};

const getAllBooks = async (req,res) => {
  try{
    //queary parameter
    const { search , category , sort } = req.query;

    //pagenation
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page-1)*limit;

    //query object
    let query = {};

    ///search by title or author
    if(search) {
      query.$or = [
        {
          title:{
            $regex :search,
            $options:"i"
          }
        },
        {
          author:{
            $regex:search,
            $options:"i"
          }
        }
      ] ;
     }

     //filter by category
     if(category) {
      query.category = {
        $regex : `^${category}`,
        $options :"i"
      };
     }

     //create query
     let bookQuery = Book.find(query);

     //sorting
     if(sort) {
      bookQuery = bookQuery.sort(sort);
     }

     //Pagination
     bookQuery = bookQuery
     .skip(skip)
     .limit(limit);

     //execute query
    const book = await bookQuery;

    //count total number of matching search/filter
    const totalBook = await Book.countDocuments(query);

    //calculate total pages
    const totalPages = await Math.ceil(totalBook/limit); 
    

    res.status(200).json({
      success:true,
      currentPage:page,
      totalPages : totalPages,
      totalBook : totalBook,
      count:book.length,
      data :book
    });

  }catch (error)
  {
    res.status(500).json({
      success:false,
      message:error.message
    });
  }
};

const getBookByID = async (req,res) => {
  try{
    const book = await Book.findById(req.params.id);

    if(!book){
      return res.status(404).json({
        success:false,
        message:"Book not Found"
      });
    }
    res.status(200).json({
      success:true,
      data:book
    });
  } catch(error) {
    res.status(500).json({
      success:false,
      message:error.message
    });
  }
};

const updateBook = async (req,res) => {
  try{
    const book = await Book.findByIdAndUpdate(
      req.params.id , 
      req.body,
      {
        new:true,
        runValidators:true
      }
    );

    if(!book) {
      return res.status(404).json({
        success:false,
        message:"Book not found"
      });
    }

    res.status(200).json({
      success:true,
      message:"Book Updated Successfully.",
      data:book
    });
  } catch(error) {
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
};

const deleteBook = async (req,res) => {
  try{
    
    const book = await Book.findByIdAndDelete(req.params.id);

    if(!book) {
      return res.status(404).json({
        success:false,
        message:"Book not Found"
      });
    }

    res.status(200).json({
      success:true,
      message:"Book Deleted Successfully"
    });
  } catch(error)
  {
    res.statu(500).json({
      success:false,
      message:error.message
    });
  }
}



module.exports={
    // getAllBooks,
    // getBookById,
    createBook,
    getAllBooks,
    getBookByID,
    updateBook,
    deleteBook
};