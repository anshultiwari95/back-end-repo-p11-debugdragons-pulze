"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticateTokenController_1 = require("../controllers/authenticateTokenController");
// import {dashboard} from "../controllers/dashboardController"
// import { authenticateToken } from "../middlewares/middleware";
const router = express_1.default.Router();
// Register/Login route
router.post("/authenticateToken", authenticateTokenController_1.authenticateToken);
// Dashboard route
// router.get("/dashboard",authenticateToken, dashboard);
exports.default = router;
