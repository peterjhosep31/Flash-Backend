import { v2 as cloudinary } from 'cloudinary';
import confiCloudinary from './confiCloudinary.js';

const cloudinaryDeleteImages = {};

confiCloudinary();

cloudinaryDeleteImages.deleteImage = (publicId) => {
  return cloudinary.uploader.destroy(publicId, (err, result) => {
    if (err) {
      console.log(err);
    }
  })
}

cloudinaryDeleteImages.deleteFolder = async (foldeRouter, folder) => {
  return await cloudinary.api.delete_resources_by_prefix(`${foldeRouter}/${folder}`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("deleteImages: OK");
    }
  });
}


export default cloudinaryDeleteImages;