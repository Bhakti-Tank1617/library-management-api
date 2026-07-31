require("dotenv").config();
const port = process.env.port||3000;

const app = require("./app");
const connectDB = require("./config/db")



const startServer = async () => {
  await connectDB();

app.listen(port , () => {
  console.log(`server is running on port ${port}`);
});
};

startServer();