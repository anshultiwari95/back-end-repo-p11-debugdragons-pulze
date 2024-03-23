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
exports.sendVideo = void 0;
const client_1 = require("../../../node_modules/.prisma/client");
// import { timeStamp } from "console";
const prisma = new client_1.PrismaClient();
const sendVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { senderId, recipientData, videoId, responseTime, workspaceId, videoObject, titleFromFrontend, descriptionFromFrontend, } = req.body;
        console.log("senderId", senderId);
        console.log("recipientData", recipientData);
        console.log("videoId", videoId);
        console.log("responseTime", responseTime);
        console.log("workspaceId", workspaceId);
        console.log("videoObject:", videoObject);
        console.log("title from frontend:", titleFromFrontend);
        console.log("description from frontend:", descriptionFromFrontend);
        if (titleFromFrontend || descriptionFromFrontend) {
            // Retrieve the video using videoId
            const existingVideo = yield prisma.video.findUnique({
                where: {
                    video_id: videoId,
                },
            });
            // Check if the retrieved video exists and if its title and description are empty
            if (existingVideo &&
                (!existingVideo.title || !existingVideo.description)) {
                // Update the video with the provided titleFromFrontend and descriptionFromFrontend
                yield prisma.video.update({
                    where: {
                        video_id: videoId,
                    },
                    data: {
                        title: titleFromFrontend || existingVideo.title,
                        description: descriptionFromFrontend || existingVideo.description,
                    },
                });
            }
        }
        // Create a new SendVideo record
        const sendVideo = yield prisma.sendVideo.create({
            data: {
                videoId,
                senderId,
                responseTime,
                workspaceId,
                recipients: {
                    create: recipientData.map((recipient) => ({
                        userId: recipient.id,
                        FYI: recipient.isToggleOn ? recipient.isToggleOn : false,
                        email: recipient.email,
                        // Add other recipient fields here
                    })),
                },
            },
            include: {
                recipients: true,
            },
        });
        res.json(sendVideo);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.sendVideo = sendVideo;
