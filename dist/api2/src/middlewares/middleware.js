"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const dotenv_1 = require("dotenv");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Load environment variables
(0, dotenv_1.config)();
const authenticateToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (Array.isArray(token)) {
        token = token[0]; // Take the first element of the array
    }
    if (!token) {
        return res.status(401).json({ status: "error", error: "Token is missing" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        const email = decoded.email;
        console.log(token);
        req.user = { email }; // Attach user object to the request for further use
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ status: "error", error: "Invalid token" });
    }
};
exports.authenticateToken = authenticateToken;
