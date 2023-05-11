<<<<<<< HEAD
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
=======
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
>>>>>>> 9cdeaec57e86b6dfc5587a5ce839f6af05d8698f
}