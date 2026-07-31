const express = require("express")

const bookRoutes = require("./routes/bookRoutes")
const userRoutes = require("./routes/userRoutes");
const borrowRoutes = require("./routes/borrowRoutes");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

app.use(express.json());

app.use("/books" , bookRoutes)
app.use("/users",userRoutes);
app.use("/borrow",borrowRoutes)
app.use(errorHandler);

app.use((req,res) => {
  res.status(404).json({
    success:false,
    message:"Route not Found"
  });
});

app.get("/" , (req,res) => {
  res.send("Library management API is running..........")
});

module.exports = app;