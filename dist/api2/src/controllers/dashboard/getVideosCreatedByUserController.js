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
exports.getVideosCreatedByUser = void 0;
const client_1 = require("../../../node_modules/.prisma/client");
// import { timeStamp } from "console";
const prisma = new client_1.PrismaClient();
const getVideosCreatedByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        console.log("userId", userId);
        // Create a new SendVideo record
        console.log("entered getVideosCreatedByUser");
        const userCreatedVideosWithDetails = yield prisma.video.findMany({
            where: {
                creatorId: userId,
            },
            include: {
                creator: true,
                sendVideos: {
                    include: {
                        recipients: {
                            include: {
                                user: true, // Include full details of the user associated with recipients
                            },
                        },
                    },
                },
                comments: {
                    orderBy: {
                        createdAt: "desc",
                    },
                    take: 1,
                    include: {
                        user: true,
                    },
                },
            },
        });
        res.json(userCreatedVideosWithDetails);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getVideosCreatedByUser = getVideosCreatedByUser;
