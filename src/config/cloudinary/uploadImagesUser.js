import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_APY_KEY,
  api_secret: process.env.CLOUDINARY_APY_KEY_SECRET,
  secure: true,
});

export default function uploadImagesUser(image) {
    return cloudinary.uploader.upload(
    image,
    {
      folder: "Flash/User",
      format: "jpg",
    },
    (err, result) => {
      if (err) {
        console.log(err);
      }
    }
  );
};

