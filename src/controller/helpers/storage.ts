import aws from "../../configs/aws";

export const uploadFile = async (
  path: any,
  buffer: Buffer,
  mimetype: string
) => {
  const file = await aws
    .upload({
      Bucket: process.env.BACKBLAZE_BUCKET as string,
      Key: path,
      Body: buffer,
      ContentType: mimetype,
    })
    .promise();

  return file.Location;
};

export const deleteFile = async (path: any) => {
  await aws
    .deleteObject({
      Bucket: process.env.BACKBLAZE_BUCKET as string,
      Key: path,
    })
    .promise();
};
