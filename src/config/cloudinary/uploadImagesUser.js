import {
  v2 as cloudinary
} from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_APY_KEY,
  api_secret: process.env.CLOUDINARY_APY_KEY_SECRET,
  secure: true,
});

const cloudinaryFolders = {}

cloudinaryFolders.createFolder = (name) => {
  return cloudinary.api.create_folder("Flash/stores/" + name, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      cloudinary.api.create_folder(result.path + "/products", (err, result) => {
        if (err) {
          console.log(err);
        }
      })
    }
  })
}

cloudinaryFolders.uploadImagesStore = (image, folder) => {
  return cloudinary.uploader.upload(
    image, {
      folder: folder,
      format: "jpg",
    }, (err, result) => {
      if (err) {
        console.log(err);
      }
    }
  )
}

cloudinaryFolders.uploadImagesUser = (image) => {
  return cloudinary.uploader.upload(
    image, {
      folder: "Flash",
      format: "jpg",
    },
    (err, result) => {
      if (err) {
        console.log(err);
      }
    }
  );
};

export default cloudinaryFolders;

// TODO: me sirve

// cloudinary.api.create_folder(result.path + "/offer", (err, result) => {
//   if (err) {
//     console.log(err);
//   }
// })