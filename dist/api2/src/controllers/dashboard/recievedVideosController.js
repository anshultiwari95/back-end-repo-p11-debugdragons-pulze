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
exports.recievedVideos = void 0;
const client_1 = require("../../../node_modules/.prisma/client");
// import { timeStamp } from "console";
const prisma = new client_1.PrismaClient();
const recievedVideos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("entered recieved Videos");
    const userId = req.params.userId;
    console.log("userId from recievedVideos", userId);
    try {
        const recievedVideos = yield prisma.recipient.findMany({
            where: {
                userId: userId,
            },
            include: {
                sendVideo: {
                    include: {
                        video: true,
                        recipients: {
                            include: {
                                user: true, // Include full details of the user associated with recipients
                            },
                        },
                        sender: true,
                    },
                },
            },
        });
        res.json(recievedVideos);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.recievedVideos = recievedVideos;
