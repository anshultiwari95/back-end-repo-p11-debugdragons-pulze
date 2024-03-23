"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import User from "../model/usermodel";
const dotenv_1 = require("dotenv");
const client_1 = require("../../node_modules/.prisma/client");
const prisma = new client_1.PrismaClient();
// Load environment variables
(0, dotenv_1.config)();
const authenticateToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Helo from authenticate token");
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
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ status: "error", error: "Invalid token" });
    }
});
exports.authenticateToken = authenticateToken;
