const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const rateLimiter = require("../middlewares/rateLimiter")

router.post("/register",rateLimiter.API,authController.register);
router.post("/login",rateLimiter.login,authController.login);
router.patch("/role/:id",rateLimiter.API,authMiddleware.authenticate,authMiddleware.authorize(["admin"]),authController.promoteRole);
router.delete("/delete/:id",rateLimiter.API,authMiddleware.authenticate,authMiddleware.authorize(["admin"]),authController.deleteUser);
router.get("/alluser",rateLimiter.API,authMiddleware.authenticate,authMiddleware.authorize(["admin"]),authController.getAllUsers);

module.exports = router;

