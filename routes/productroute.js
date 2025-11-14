const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController")
const authMiddleware = require("../middlewares/authMiddleware");
const rateLimiter = require("../middlewares/rateLimiter");

router.post("/",
    rateLimiter.API,
    authMiddleware.authenticate,
    authMiddleware.authorize(["seller","admin"]),
    productController.NewProduct
);

router.patch("/update/:id",
    rateLimiter.API,
    authMiddleware.authenticate,
    authMiddleware.authorize(["seller","admin"]),
    productController.UpdateProduct
);

router.get("/allproducts",
    rateLimiter.API,
    authMiddleware.authenticate,
    authMiddleware.authorize(["seller","admin","customer"]),
    productController.GetAllProducts
);

router.get("/myproducts",
    rateLimiter.API,
    authMiddleware.authenticate,
    authMiddleware.authorize(["seller","admin"]),
    productController.Getmyproduct
);

router.delete("/delete/:id",
    rateLimiter.API,
    authMiddleware.authenticate,
    authMiddleware.authorize(["seller","admin"]),
    productController.DeleteProduct
);

router.get("/search",
    rateLimiter.API,
    authMiddleware.authenticate,
    authMiddleware.authorize(["seller","admin","customer"]),
    productController.SearchProduct
);

router.get("/:id",
    rateLimiter.API,
    authMiddleware.authenticate,
    authMiddleware.authorize(["seller","admin"]),
    productController.GetDetailProduct
);


module.exports = router;