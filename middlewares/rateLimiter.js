const rateLimit = require("express-rate-limit");

//สำหรับ Login 
const login = rateLimit({
    windowMs: 15*60*1000, //15 นาที
    max: 5, // 5 request per IP
    message: {message:"Too many requests from this IP,lease try again after 15 minutes"}
});

//สำหรับ API ทั่วไป
const API = rateLimit({
    windowMs: 15*60*1000, //15 นาที
    max: 100, // 100 request per IP
    message: {message:"Too many requests from this IP,lease try again after 15 minutes"}
});

module.exports = {login,API}