import dotenv from "dotenv";
import cloudinary from "cloudinary";

dotenv.config();

export default function connectCloudinary() {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_APY_KEY,
    api_secret: process.env.CLOUDINARY_APY_KEY_SECRET,
    secure: true,
  });
}