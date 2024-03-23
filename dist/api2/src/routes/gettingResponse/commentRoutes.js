"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer = require("multer");
const commentsController_1 = require("../../controllers/gettingResponse/commentsController");
const router = express_1.default.Router();
// Multer configuration
const storage = multer.memoryStorage(); // This stores the file in memory
const upload = multer({ storage: storage });
router.get("/comments/:videoId", commentsController_1.fetchComments);
router.post("/comments/createcomment/:videoId", commentsController_1.createComments);
router.post("/comments/createvideocomment/:videoId", upload.single("file"), commentsController_1.uploadVideoAndCreateComment);
router.delete("/comments/deletecomment/:commentId", commentsController_1.deleteComment);
exports.default = router;
