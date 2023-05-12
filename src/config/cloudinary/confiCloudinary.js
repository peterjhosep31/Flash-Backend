import dotenv from "dotenv";
import cloudinary from "cloudinary";

dotenv.config();

export default function connectCloudinary() {
  cloudinary.config({
    cloud_name: 'djaejhxwz',
    api_key: '849518477251571',
    api_secret: 'mEYQ6SPWRwH4GPG9MBX1ObELlwc',
    secure: true,
  });
}