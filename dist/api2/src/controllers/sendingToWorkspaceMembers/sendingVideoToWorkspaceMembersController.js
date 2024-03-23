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
exports.sendingVideoToWorspaceMembers = void 0;
const client_1 = require("../../../node_modules/.prisma/client");
const prisma = new client_1.PrismaClient();
const sendingVideoToWorspaceMembers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const { query } = req.query;
    // console.log(query);
    // console.log("hello from search");
    // try {
    //   const suggestions = await prisma.user.findMany({
    //     where: {
    //       email: {
    //         contains: (query as string) || "",
    //       },
    //     },
    //     take: 5, // Limit the number of suggestions
    //   });
    //   res.json({ suggestions });
    // } catch (error) {
    //   console.error(error);
    //   res.status(500).json({ error: "Internal server error" });
    // }
    const { query, workspaceId } = req.query;
    const { content, userId, timeStamp, type, parentCommentId } = req.body;
    try {
        if (!workspaceId) {
            return res.status(400).json({ error: "Workspace ID is required" });
        }
        const suggestions = yield prisma.user.findMany({
            where: {
                workspaceMembers: {
                    some: {
                        workspace_id: workspaceId,
                    },
                },
                OR: [
                    { name: { contains: query } },
                    { email: { contains: query } },
                ],
            },
            select: {
                id: true,
                name: true,
                email: true,
                image: true, // Include other fields you want to retrieve
            },
            take: 5, // Limit the number of suggestions
        });
        res.json({ suggestions });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.sendingVideoToWorspaceMembers = sendingVideoToWorspaceMembers;
