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
exports.deleteVideo = void 0;
const client_1 = require(".prisma/client");
// // import { timeStamp } from "console";
const prisma = new client_1.PrismaClient();
const deleteVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.method === "DELETE") {
        const { videoId } = req.body;
        console.log("videoId from deleteVideo", videoId);
        try {
            // Step 1: Find the video
            const video = yield prisma.video.findUnique({
                where: {
                    video_id: videoId,
                },
                include: {
                    sendVideos: {
                        include: {
                            recipients: true,
                        },
                    },
                    comments: true,
                },
            });
            if (!video) {
                return res.status(404).json({ message: "Video not found" });
            }
            // Step 2: Delete related records
            // Delete related records in Recipient first
            for (const sendVideo of video.sendVideos) {
                for (const recipient of sendVideo.recipients) {
                    yield prisma.recipient.delete({
                        where: {
                            id: recipient.id,
                        },
                    });
                }
            }
            // Delete related records in SendVideo
            for (const sendVideo of video.sendVideos) {
                yield prisma.sendVideo.delete({
                    where: {
                        id: sendVideo.id,
                    },
                });
            }
            // Delete related comments
            for (const comment of video.comments) {
                yield prisma.comment.delete({
                    where: {
                        id: comment.id,
                    },
                });
            }
            // Step 3: Delete the video itself
            yield prisma.video.delete({
                where: {
                    video_id: videoId,
                },
            });
            return res.status(200).json({ message: "Video deleted successfully" });
        }
        catch (error) {
            console.error("Error deleting video:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    else {
        res.setHeader("Allow", ["DELETE"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
});
exports.deleteVideo = deleteVideo;
// export const deleteVideo = async (req: Request, res: Response) => {
//   if (req.method === "DELETE") {
//     const { videoId } = req.body;
//     console.log("videoId from deleteVideo", videoId);
//     try {
//       // Step 1: Find the video
//       const video = await prisma.video.findUnique({
//         where: {
//           video_id: videoId,
//         },
//         include: {
//           sendVideos: true,
//           comments: true,
//         },
//       });
//       if (!video) {
//         return res.status(404).json({ message: "Video not found" });
//       }
//       // Step 2: Delete related records
//       // Delete related records in Recipient first
//       if (video.sendVideos.length > 0) {
//         for (const sendVideo of video.sendVideos) {
//           await prisma.recipient.deleteMany({
//             where: {
//               sendVideoId: sendVideo.id,
//             },
//           });
//         }
//       }
//       // Delete related records in SendVideo
//       if (video.sendVideos.length > 0) {
//         await prisma.sendVideo.deleteMany({
//           where: {
//             videoId: videoId,
//           },
//         });
//       }
//       // Delete related records in Recipient
//       if (video.sendVideos.length > 0) {
//         await prisma.recipient.deleteMany({
//           where: {
//             sendVideoId: videoId,
//           },
//         });
//       }
//       // Delete related comments
//       if (video.comments.length > 0) {
//         for (const comment of video.comments) {
//           await prisma.comment.delete({
//             where: {
//               id: comment.id,
//             },
//           });
//         }
//       }
//       // Step 3: Delete the video itself
//       await prisma.video.delete({
//         where: {
//           video_id: videoId,
//         },
//       });
//       return res.status(200).json({ message: "Video deleted successfully" });
//     } catch (error) {
//       console.error("Error deleting video:", error);
//       return res.status(500).json({ message: "Internal server error" });
//     }
//   } else {
//     res.setHeader("Allow", ["DELETE"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// };
