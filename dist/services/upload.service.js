import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";
import { s3Client } from "../config/s3.js";
export const generateUploadUrl = async (fileName, contentType) => {
    const extension = fileName.split(".").pop();
    const key = `uploads/${randomUUID()}.${extension}`;
    const command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: key,
        ContentType: contentType,
    });
    const uploadUrl = await getSignedUrl(s3Client, command, {
        expiresIn: 300,
    });
    return {
        uploadUrl,
        key,
    };
};
