import fs from 'fs';
import S3 from 'aws-sdk/clients/s3';

const s3 = new S3({
  region: process.env.AWS_S3_BUCKET_REGION,
  accessKeyId: process.env.AWS_S3_ACCESS_KEY,
  secretAccessKey: process.env.AWS_S3_SECRET,
});

export function uploadFile(file: Express.Multer.File) {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams: S3.PutObjectRequest = {
    Bucket: process.env.AWS_S3_BUCKET_NAME as string,
    Body: fileStream,
    Key: file.filename,
  };

  return s3.upload(uploadParams).promise();
}

export function getFileStream(fileKey: string) {
  const downloadParams: S3.GetObjectRequest = {
    Key: fileKey,
    Bucket: process.env.AWS_S3_BUCKET_NAME as string,
  };

  return s3.getObject(downloadParams).createReadStream();
}

export function deleteFile(fileKey: string) {
  const deleteParams: S3.DeleteObjectRequest = {
    Key: fileKey,
    Bucket: process.env.AWS_S3_BUCKET_NAME as string,
  };
  return s3.deleteObject(deleteParams).promise();
}
