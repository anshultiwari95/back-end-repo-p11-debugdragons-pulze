import AWS, { S3Client } from "@aws-sdk/client-s3";
// import { Endpoint } from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();
// process.env.ACCESSKEYID;
const ACCESSKEYID = process.env.ACCESSKEYID;
const SECRETACCESSKEY = process.env.SECRETACCESSKEY;
const BUCKET_NAME = process.env.BUCKET_NAME;
const END_POINT = process.env.END_POINT;

if (!ACCESSKEYID || !SECRETACCESSKEY) {
  throw new Error("AWS Access Key ID and Secret Access Key must be defined");
}

export const bucket = "pulze-bucket-new";

export const s3 = new S3Client({
  endpoint: "http://s3-ap-south-1.amazonaws.com",
  credentials: {
    accessKeyId: ACCESSKEYID,

    secretAccessKey: SECRETACCESSKEY,
  },
  region: "ap-south-1",
  forcePathStyle: true,
  tls: false,
});

// export const s3 = new AWS.S3({
//   endpoint: "http://s3-ap-south-1.amazonaws.com",
//   accessKeyId: ACCESSKEYID,
//   secretAccessKey: SECRETACCESSKEY,
//   sslEnabled: false,
//   s3ForcePathStyle: true,
// });

// endpoint: "https://s3.eu-north-1.amazonaws.com",
