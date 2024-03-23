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
Object.defineProperty(exports, "__esModule", { value: true });
exports.findingVideoId = void 0;
const client_1 = require(".prisma/client");
// import { timeStamp } from "console";
const prisma = new client_1.PrismaClient();
const findingVideoId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { videoId } = req.params;
    console.log("videoId from get videoId", videoId);
    try {
        const video = yield prisma.video.findUnique({
            where: {
                video_id: videoId,
            },
            include: {
                creator: true,
            },
        });
        if (!video) {
            return res.status(404).json({ error: "Video not found" });
        }
        const creator = video.creator;
        res.json({ key: video.Key, createdon: video.createdOn, creator });
    }
    catch (error) {
        console.error("Error fetching video:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.findingVideoId = findingVideoId;
