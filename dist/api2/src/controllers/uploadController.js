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
exports.uploadVideo = void 0;
// import User from "../model/usermodel";
const dotenv_1 = require("dotenv");
const client_1 = require("../../node_modules/.prisma/client");
const stream_1 = __importDefault(require("stream"));
const prisma = new client_1.PrismaClient();
const stream_2 = require("../../../api/src/modules/stream");
// Load environment variables
(0, dotenv_1.config)();
// interface MyRequest extends Request {
//     file: {
//       filename: string;
//       createReadStream: () => NodeJS.ReadableStream;
//       // Add any other properties you expect in the file object
//     };
//   }
const uploadVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Hello from backend");
    // console.log("Request object:", req);
    const { file } = req;
    const { title, description } = req.body; // Assuming you are using a middleware to handle file uploads
    console.log(`file:${file}`);
    console.log(`title:${title}`);
    console.log(`description:${description}`);
    if (!file) {
        return res.status(400).json({ error: "No file provided" });
    }
    const { buffer, originalname } = file;
    // console.log(filename);
    const stream1 = new stream_1.default.PassThrough();
    stream1.end(buffer);
    //   const { file } = req as any; // Assuming you are using a middleware to handle file uploads
    // console.log(file);
    //   if (!file) {
    //     return res.status(400).json({ error: 'No file provided' });
    //   }
    //   const { filename, createReadStream } = formData;
    //   const stream = createReadStream();
    try {
        const uploadStream = (0, stream_2.createUploadStream)(originalname);
        stream1.pipe(uploadStream.writeStream);
        const result = yield uploadStream.promise;
        console.log(result);
        const { ETag, Location, Bucket, Key } = result;
        try {
            const creatorId = "d68e3f11-bdab-430f-9dc2-54c2c088864d"; // Replace with the actual user ID
            const workspaceId = "1bd89f4c-36eb-4411-9232-acb129219e8f";
            const newVideo = yield prisma.video.create({
                data: {
                    title: title,
                    description: description,
                    ETag,
                    Location,
                    Key,
                    Bucket,
                    creator: { connect: { id: creatorId } },
                    workspace: { connect: { workspace_id: workspaceId } },
                },
            });
            console.log(newVideo);
            res.json({
                success: true,
                result: {
                    VideoUploadedToS3Details: result,
                    VideoUploadedtoVideoMySqlDetails: newVideo,
                },
            });
        }
        catch (error) {
            console.error(`failed to add video to mysql:${error}`);
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
exports.uploadVideo = uploadVideo;
//   try {
//     const uploadStream = createUploadStream(filename);
//     stream.pipe(uploadStream.writeStream);
//     const result = await uploadStream.promise;
//     res.json({ success: true, result });
//   } catch (error: any) {
//     console.error(`[Error]: Message: ${error.message}, Stack: ${error.stack}`);
//     res.status(500).json({ error: `Error uploading file ${filename} hello`,filename });
//   }
// }
// export const dashboard = async (req: Request, res: Response) => {
//   const token = req.header("x-access-token");
//   try {
//     const decoded: any = jwt.verify(token!, process.env.SECRET_KEY!);
//     const email = decoded.email;
//     const user = await User.findOne({ email: email });
//     if (user) {
//       const name = user.email.split("@")[0];
//       res.json({ message: "Authenticated email found", name: name, status: "ok" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.json({ status: "error", error: "Invalid token" });
//   }
// };
