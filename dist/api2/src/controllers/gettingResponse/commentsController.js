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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.uploadVideoAndCreateComment = exports.createComments = exports.fetchComments = void 0;
const client_1 = require("../../../node_modules/.prisma/client");
const stream_1 = require("../../../../api/src/modules/stream");
const stream_2 = __importDefault(require("stream"));
// import { timeStamp } from "console";
const prisma = new client_1.PrismaClient();
const fetchComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { videoId } = req.params;
    try {
        // const comments = await prisma.comment.findMany(
        //   {
        //   where: { videoId },
        //   select: {
        //     id: true,
        //     content: true,
        //     parentCommentId: true,
        //     createdAt: true,
        //     updatedAt: true,
        //     replies: true,
        //     user: {
        //       select: {
        //         id: true,
        //         name: true,
        //         image: true,
        //       },
        //     },
        //   },
        // }
        // );
        const comments = yield prisma.comment.findMany({
            where: { videoId },
            select: {
                id: true,
                content: true,
                parentCommentId: true,
                createdAt: true,
                updatedAt: true,
                timeStamp: true,
                type: true,
                replies: {
                    select: {
                        id: true,
                        content: true,
                        parentCommentId: true,
                        createdAt: true,
                        updatedAt: true,
                        timeStamp: true,
                        type: true,
                        user: {
                            select: {
                                id: true,
                                name: true,
                                image: true,
                            },
                        },
                    },
                },
                user: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                    },
                },
            },
        });
        res.json({ comments });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.fetchComments = fetchComments;
const createComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { videoId } = req.params;
    const { content, userId, timeStamp, type, parentCommentId } = req.body;
    console.log(`parentId:${parentCommentId}`);
    console.log(`type:${type}`);
    try {
        const newComment = yield prisma.comment.create({
            data: {
                content,
                type: type, // You may adjust the type based on your requirements
                timeStamp,
                userId,
                videoId,
                parentCommentId,
            },
            include: { user: true }, // Include user information for the created comment
        });
        res.json(newComment);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.createComments = createComments;
const uploadVideoAndCreateComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Hello from uploadVideoAndCreateComment backend");
    // console.log("Request object:", req);
    const { file } = req;
    // const { title, description } = req.body as any; // Assuming you are using a middleware to handle file uploads
    console.log(req.body);
    console.log(`file:${file}`);
    // console.log(`title:${title}`);
    // console.log(`description:${description}`);
    if (!file) {
        return res.status(400).json({ error: "No file provided" });
    }
    const { buffer, originalname } = file;
    // console.log(filename);
    const stream1 = new stream_2.default.PassThrough();
    stream1.end(buffer);
    //   const { file } = req as any; // Assuming you are using a middleware to handle file uploads
    // console.log(file);
    //   if (!file) {
    //     return res.status(400).json({ error: 'No file provided' });
    //   }
    //   const { filename, createReadStream } = formData;
    //   const stream = createReadStream();
    try {
        const uploadStream = (0, stream_1.createUploadStream)(originalname);
        stream1.pipe(uploadStream.writeStream);
        const result = yield uploadStream.promise;
        console.log(result);
        const { ETag, Location, Bucket, Key } = result;
        try {
            // const creatorId = "d68e3f11-bdab-430f-9dc2-54c2c088864d"; // Replace with the actual user ID
            // const workspaceId = "1bd89f4c-36eb-4411-9232-acb129219e8f";
            const { videoId } = req.params;
            const { userId, timeStamp, typeComment, parentCommentId } = req.body;
            console.log(`userId:${userId}`);
            // console.log(req.body);
            console.log(`parentId:${parentCommentId}`);
            console.log(typeComment);
            const newComment = yield prisma.comment.create({
                data: {
                    content: `https://d1yt4919vxgwb5.cloudfront.net/${Key}`,
                    type: typeComment, // You may adjust the type based on your requirements
                    timeStamp,
                    ETag,
                    Location,
                    Key,
                    Bucket,
                    userId,
                    videoId,
                    parentCommentId,
                },
                include: { user: true }, // Include user information for the created comment
            });
            // res.json();
            res.json({ success: true, result, newComment });
        }
        catch (error) {
            console.error(`failed to create Video Comment${error}`);
            res
                .status(500)
                .json({ error: `Error add video ${originalname} hello`, originalname });
        }
    }
    catch (error) {
        console.error(`[Error]: Message: ${error.message}, Stack: ${error.stack}`);
        res.status(500).json({
            error: `Error uploading file ${originalname} hello`,
            originalname,
        });
    }
});
exports.uploadVideoAndCreateComment = uploadVideoAndCreateComment;
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("reached delete comment");
    const { commentId } = req.params;
    try {
        // Delete the comment with the provided commentId
        const deletedComment = yield prisma.comment.delete({
            where: {
                id: commentId,
            },
        });
        res.status(204).send(deletedComment); // Comment successfully deleted
    }
    catch (error) {
        console.error("Error deleting comment:", error);
        res
            .status(500)
            .json({ error: "An error occurred while deleting the comment." });
    }
});
exports.deleteComment = deleteComment;
