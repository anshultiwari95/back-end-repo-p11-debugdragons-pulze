// import stream from "stream";

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

import stream from "stream";
import { Upload } from "@aws-sdk/lib-storage";
import { bucket, s3 } from "./bucket";

export const createUploadStream = (key: string) => {
  const pass = new stream.PassThrough();
  const upload = new Upload({
    client: s3,
    params: {
      Bucket: bucket,
      Key: key,
      Body: pass,
    },
  });

  return {
    writeStream: pass,
    promise: upload.done(),
  };
};

