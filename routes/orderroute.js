const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middlewares/authMiddleware");
const rateLimiter = require("../middlewares/rateLimiter")

router.post("/",
    rateLimiter.API,
    authMiddleware.authenticate,
    authMiddleware.authorize(["customer","admin"]),
    orderController.CreateOrder
);

router.delete("/delete/:id",
    rateLimiter.API,
    authMiddleware.authenticate,
    authMiddleware.authorize(["customer","admin"]),
    orderController.deleteOrder
);

router.get("/myorders",
    rateLimiter.API,
    authMiddleware.authenticate,
    authMiddleware.authorize(["customer","admin","seller"]),
    orderController.viewOrder
);

module.exports = router;