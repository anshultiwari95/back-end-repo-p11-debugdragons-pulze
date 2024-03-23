"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer = require('multer');
const uploadController_1 = require("../controllers/uploadController");
// import { registerOrLogin } from "../controllers/authControllers";
// import {dashboard} from "../controllers/dashboardController"
// import { authenticateToken } from "../middlewares/middleware";
const router = express_1.default.Router();
// Multer configuration
const storage = multer.memoryStorage(); // This stores the file in memory
const upload = multer({ storage: storage });
// Register/Login route
router.post("/uploadVideo", upload.single('file'), uploadController_1.uploadVideo);
// Dashboard route
// router.get("/dashboard",authenticateToken, dashboard);
exports.default = router;
