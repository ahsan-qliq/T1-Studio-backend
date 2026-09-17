import { generateUploadUrl } from "../services/upload.service.js";
export const getUploadUrl = async (req, res) => {
    try {
        const { fileName, contentType } = req.body;
        if (!fileName || !contentType) {
            return res.status(400).json({
                success: false,
                message: "fileName and contentType are required",
            });
        }
        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
        ];
        if (!allowedTypes.includes(contentType)) {
            return res.status(400).json({
                success: false,
                message: "Invalid file type",
            });
        }
        const data = await generateUploadUrl(fileName, contentType);
        return res.status(200).json({
            success: true,
            data,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to generate upload URL",
        });
    }
};
