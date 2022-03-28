require("dotenv").config();
const S3 = require("aws-sdk/clients/s3");
const crypto = require("crypto");
const { promisify } = require("util");

const randomBytes = promisify(crypto.randomBytes);

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});

async function generateUploadURL() {
  const rawBytes = await randomBytes(16);
  const imageName = rawBytes.toString("hex");

  const url = s3.getSignedUrl("putObject", {
    Bucket: bucketName,
    Key: imageName,
    ContentType: "image/jpeg",
    Expires: 60,
    ACL: "public-read",
  });

  return url;
}

module.exports = generateUploadURL;
