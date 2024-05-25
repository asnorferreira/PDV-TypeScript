import aws from "aws-sdk";
import "dotenv/config";

const s3 = new aws.S3({
  endpoint:
    process.env.ENDPOINT_S3 !== undefined
      ? new aws.Endpoint(process.env.ENDPOINT_S3)
      : undefined,
  credentials: {
    accessKeyId: String(process.env.KEY_ID),
    secretAccessKey: String(process.env.APP_KEY),
  },
});

export default s3;
