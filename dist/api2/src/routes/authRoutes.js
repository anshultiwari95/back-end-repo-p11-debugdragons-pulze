"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authControllers_1 = require("../controllers/authControllers");
// import {dashboard} from "../controllers/dashboardController"
// import { authenticateToken } from "../middlewares/middleware";
const router = express_1.default.Router();
// Register/Login route
router.post("/registerOrLogin", authControllers_1.registerOrLogin);
router.get("/get-user-info", authControllers_1.getUserInfoContoller);
router.post("/update-user-name", authControllers_1.updateUserNameContoller);
// Dashboard route
// router.get("/dashboard",authenticateToken, dashboard);
exports.default = router;
