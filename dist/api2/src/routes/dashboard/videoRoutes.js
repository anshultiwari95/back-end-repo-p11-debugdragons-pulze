"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getVideosCreatedByUserController_1 = require("../../controllers/dashboard/getVideosCreatedByUserController");
const recievedVideosController_1 = require("../../controllers/dashboard/recievedVideosController");
const deleteVideoByVideoIdController_1 = require("../../controllers/dashboard/deleteVideoByVideoIdController");
const router = express_1.default.Router();
router.get("/getvideos/:userId", getVideosCreatedByUserController_1.getVideosCreatedByUser);
router.get("/recievedvideos/:userId", recievedVideosController_1.recievedVideos);
router.delete("/deletevideo", deleteVideoByVideoIdController_1.deleteVideo);
exports.default = router;
