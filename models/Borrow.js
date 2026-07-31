const mongoose = require("mongoose");

const borrowSchema = new mongoose.Schema({

    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },

    book :{
        type:mongoose.Schema.Types.ObjectId,
        ref :"Book",
        required:true
    },

    dueDate: {
        type:Date,
        required:true
    },

    returnDate:{
        type:Date
    },

    status: {
        type:String,
        enum:["borrowed" , "returned"],
        default : "borrowed"
    }
},
{
    timestamps:true
});

const Borrow = mongoose.model("Borrow" , borrowSchema);

module.exports = mongoose.model("Borrow" , borrowSchema)