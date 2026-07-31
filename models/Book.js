const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
title:{
    type:String,
    required : true
},

author:{
    type:String,
    required : true
},

isbn:{
    type:String,
    required : true,
    unique:true
},

category:{
    type:String,
    required : true
},

description:{
    type:String
},

publishedYear:{
    type:Number
},

totalCopies:{
    type:Number,
    required : true,
    default:1
},

availableCopies:{
    type:Number,
    default: 1
},

coverImage:{
    type:String,
    default:""
}
},{
 timestamp : true
});

const Book = mongoose.model("Book" , bookSchema);

module.exports = Book;