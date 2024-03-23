"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sendVideoController_1 = require("../../controllers/recordingCompleted/sendVideoController");
const router = express_1.default.Router();
router.post("/sendvideo", sendVideoController_1.sendVideo);
exports.default = router;
