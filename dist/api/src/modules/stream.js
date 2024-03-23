"use strict";
// import stream from "stream";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUploadStream = void 0;
// import { bucket, s3 } from "./bucket";
// export const createUploadStream = (key) => {
//   const pass = new stream.PassThrough();
//   return {
//     writeStream: pass,
//     promise: s3
//       .upload({
//         Bucket: bucket,
//         Key: key,
//         Body: pass,
//       })
//       .promise(),
//   };
// };
const stream_1 = __importDefault(require("stream"));
const bucket_1 = require("./bucket");
const createUploadStream = (key) => {
    const pass = new stream_1.default.PassThrough();
    return {
        writeStream: pass,
        promise: bucket_1.s3
            .upload({
            Bucket: bucket_1.bucket,
            Key: key,
            Body: pass,
        })
            .promise(),
    };
};
exports.createUploadStream = createUploadStream;
