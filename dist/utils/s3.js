import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
});
export const generateImageUrl = async (key) => {
    if (!key)
        return "";
    const command = new GetObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: key,
    });
    return getSignedUrl(s3Client, command, {
        expiresIn: 3600,
    });
};
