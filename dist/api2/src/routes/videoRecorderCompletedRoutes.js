"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const videoRecorderCompletedController_1 = require("../controllers/videoRecorderCompletedController");
// import {dashboard} from "../controllers/dashboardController"
// import { authenticateToken } from "../middlewares/middleware";
const router = express_1.default.Router();
// Register/Login route
router.get("/videorecordercompleted/search", videoRecorderCompletedController_1.recorderCompletedSearch);
// Dashboard route
// router.get("/dashboard",authenticateToken, dashboard);
exports.default = router;
