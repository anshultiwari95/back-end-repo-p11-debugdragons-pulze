import AWS, {S3Client} from "@aws-sdk/client-s3"
// import { Endpoint } from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();
// process.env.ACCESSKEYID;
const ACCESSKEYID = process.env.ACCESSKEYID;
const SECRETACCESSKEY = process.env.SECRETACCESSKEY;
const BUCKET_NAME = process.env.BUCKET_NAME;
const END_POINT = process.env.END_POINT;

console.log("accessKey", ACCESSKEYID);
console.log("secretaccessKey", SECRETACCESSKEY);

export const bucket = "pulze-bucket-new";

export const s3 = new S3Client({
  endpoint: "http://s3-ap-south-1.amazonaws.com",
  credentials: {
    accessKeyId: String(ACCESSKEYID),
    secretAccessKey: String(SECRETACCESSKEY),
  },
  region: "ap-south-1",
  forcePathStyle: true,
  tls: false
});

// export const s3 = new AWS.S3({
//   endpoint: "http://s3-ap-south-1.amazonaws.com",
//   accessKeyId: ACCESSKEYID,
//   secretAccessKey: SECRETACCESSKEY,
//   sslEnabled: false,
//   s3ForcePathStyle: true,
// });

// endpoint: "https://s3.eu-north-1.amazonaws.com",
