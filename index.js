// Importing neccessary modules and pakages
const express = require("express");
const app = express();
const database = require("./config/database");
const cors = require("cors")
const userRoutes = require("./routes/UserRoutes");
const categoryRoutes = require("./routes/CategoryRoutes")

// Loading enviornment variables from .env file
require("dotenv").config();

// Middlewares
app.use(express.json());
app.use(cors())

// Setting up Port number
const PORT = process.env.PORT || 4000;

database.connect()

// Setting up routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/category" , categoryRoutes)

// Testing the server
app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is up and running ...",
	});
});

// Listening to the server
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})