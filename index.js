require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

//Import routes
const authRoutes = require("./routes/authoute");
const productRoutes = require("./routes/productroute");
const orderRoutes = require("./routes/orderroute");

//PORT
const PORT = process.env.PORT || 3000;

//middlewares
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/auth",authRoutes);
app.use("/api/products",productRoutes);
app.use("/api/orders",orderRoutes);

//Star server
app.listen(PORT,() => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


