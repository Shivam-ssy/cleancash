import dotenv from 'dotenv'
dotenv.config()
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  const uploadToCloudinary = async (fileBuffer) => {
    try {
      return await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: "image" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(fileBuffer);
      });
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      throw error;
    }
  };
  
export {cloudinary,uploadToCloudinary}
  