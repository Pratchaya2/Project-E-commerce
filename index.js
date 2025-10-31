require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

//Import routes
const authRoutes = require("./routes/authroute");

//PORT
const PORT = process.env.PORT || 3000;

//middlewares
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/auth",authRoutes);


//Star server
app.listen(PORT,() => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


