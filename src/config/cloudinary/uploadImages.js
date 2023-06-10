import { v2 as cloudinary } from "cloudinary";

import confiCloudinary from "./confiCloudinary.js"
import { format } from "mysql";

const cloudinaryUploadImages = {}

confiCloudinary();

cloudinaryUploadImages.createFolder = name => {
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

cloudinaryUploadImages.uploadImagesStore = (image, folder) => {
  return cloudinary.uploader.upload(image, {
    folder: "Flash/Stores/", folder,
    format: "png",
    width: 300,
    height: 300,
    density: 1080,
    crop: "fill"
  }, (err, result) => {
    if (err) {
      console.log(err);
    }
  }
  )
};

cloudinaryUploadImages.uploadImagesCategories = (image) => {
  return cloudinary.uploader.upload(image, {
    folder: "Flash/Categories/",
    format: "png",
    width: 500,
    height: 600,
    density: 1080,
    crop: "fill"
  }, (err, result) => {
    if (err) {
      console.log(err);

    }
  })
}


cloudinaryUploadImages.uploadImagesProducts = async (image) => {
  return await cloudinary.uploader.upload(image, {
    folder: `Flash/`,
    format: "png",
    width: 500,
    height: 600,
    density: 1080,
    crop: "fill"
  });
}

cloudinaryUploadImages.uploadImagesUserAdmin = image => {
  return cloudinary.uploader.upload(
    image, {
    folder: "Flash/Users/Administrator/",
    format: "jpg",
  },
    (err, result) => {
      if (err) {

        console.log(err);

      }
    }
  );
};

cloudinaryUploadImages.uploadImagesUserEmployee = image => {
  return cloudinary.uploader.upload(
    image, {
    folder: "Flash/Users/Employee/",
    format: "jpg",
  },
    (err, result) => {
      if (err) {

        console.log(err);

      }
    }
  );
}

cloudinaryUploadImages.uploadImagesUserCustomer = image => {
  return cloudinary.uploader.upload(
    image, {
    folder: "Flash/Users/Customer/",
    format: "jpg",
  },
    (err, result) => {
      if (err) {

        console.log(err);

      }
    }
  )
}

export default cloudinaryUploadImages;

// TODO: me sirve

// cloudinary.api.create_folder(result.path + "/offer", (err, result) => {
//   if (err) {
//     console.log(err);
//   }
// })