import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_APY_KEY,
  api_secret: process.env.CLOUDINARY_APY_KEY_SECRET,
  secure: true,
});

export const uploadImagesProduct = (image) => {
  cloudinary.uploader.upload(
    image,
    {
      folder: "Flash/Products",
      format: "jpg",
    },
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        let urlImage = result.secure_url;
        let idImage = result.public_id;
        let dataImage = {
          url: urlImage,
          id: idImage,
        };
        return dataImage;
      }
    }
  );
};
