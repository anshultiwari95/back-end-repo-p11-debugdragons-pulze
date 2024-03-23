"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3 = exports.bucket = void 0;
const AWS = require("aws-sdk");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// process.env.ACCESSKEYID;
const ACCESSKEYID = process.env.ACCESSKEYID;
const SECRETACCESSKEY = process.env.SECRETACCESSKEY;
const BUCKET_NAME = process.env.BUCKET_NAME;
const END_POINT = process.env.END_POINT;
console.log(ACCESSKEYID);
console.log(SECRETACCESSKEY);
exports.bucket = "pulze-bucket-new";
exports.s3 = new AWS.S3({
    endpoint: "http://s3-ap-south-1.amazonaws.com",
    accessKeyId: ACCESSKEYID,
    secretAccessKey: SECRETACCESSKEY,
    sslEnabled: false,
    s3ForcePathStyle: true,
    region: "Asia Pacific (Mumbai) ap-south-1",
});
// export const s3 = new AWS.S3({
//   endpoint: "http://s3-ap-south-1.amazonaws.com",
//   accessKeyId: ACCESSKEYID,
//   secretAccessKey: SECRETACCESSKEY,
//   sslEnabled: false,
//   s3ForcePathStyle: true,
// });
// endpoint: "https://s3.eu-north-1.amazonaws.com",
