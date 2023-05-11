<<<<<<< HEAD
import { v2 as cloudinary } from "cloudinary";

import confiCloudinary from "./confiCloudinary.js"
import { format } from "mysql";

const cloudinaryUploadImages = {}

confiCloudinary();

cloudinaryUploadImages.createFolder = name => {
  return cloudinary.api.create_folder("Flash/stores/" + name, (err, result) => {
    if (err) {
      console.log("________________________________");
      console.log(err);
      console.log("________________________________");
    } else {
      cloudinary.api.create_folder(result.path + "/products", (err, result) => {
        if (err) {
          console.log("________________________________");
          console.log(err);
          console.log("________________________________");
        }
      })
    }
  })
}

cloudinaryUploadImages.uploadImagesStore = (image, folder) => {
  return cloudinary.uploader.upload(image, {
    folder: folder,
    format: "jpg"
  }, (err, result) => {
    if (err) {
      console.log("________________________________");
      console.log(err);
      console.log("________________________________");
    }
  }
  )
};

cloudinaryUploadImages.uploadImagesCategories = (image) => {
  return cloudinary.uploader.upload(image, {
    folder: "Flash/Categories/",
    format: "jpg"
  }, (err, result) => {
    if (err) {
      console.log("________________________________");
      console.log(err);
      console.log("________________________________");

    }
  })
}


cloudinaryUploadImages.uploadImagesProducts = async (image, folder) => {
  return await cloudinary.uploader.upload(image, {
    folder: `Flash/Stores/${folder}/products/`,
    format: "png",
    width: 500,
    height: 600,
    density: 1080,
    crop: "fill"
    }, async (result, error) => {
    if (err){
      console.log(error);
    }
  })
}

cloudinaryUploadImages.uploadImagesUserAdmin = image => {
  return cloudinary.uploader.upload(
    image, {
    folder: "Flash/Users/Administrator/",
    format: "jpg",
  },
    (err, result) => {
      if (err) {
        console.log("________________________________");
        console.log(err);
        console.log("________________________________");
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
        console.log("________________________________");
        console.log(err);
        console.log("________________________________");
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
        console.log("________________________________");
        console.log(err);
        console.log("________________________________");
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
=======
import { v2 as cloudinary } from "cloudinary";

import confiCloudinary from "./confiCloudinary.js"

const cloudinaryUploadImages = {}

confiCloudinary();

cloudinaryUploadImages.createFolder = name => {
  return cloudinary.api.create_folder("Flash/stores/" + name, (err, result) => {
    if (err) {
      console.log("________________________________");
      console.log(err);
      console.log("________________________________");
    } else {
      cloudinary.api.create_folder(result.path + "/products", (err, result) => {
        if (err) {
          console.log("________________________________");
          console.log(err);
          console.log("________________________________");
        }
      })
    }
  })
}

cloudinaryUploadImages.uploadImagesStore = (image, folder) => {
  return cloudinary.uploader.upload(image, {
    folder: folder,
    format: "jpg"
  }, (err, result) => {
    if (err) {
      console.log("________________________________");
      console.log(err);
      console.log("________________________________");
    }
  }
  )
};

cloudinaryUploadImages.uploadImagesCategories = (image) => {
  return cloudinary.uploader.upload(image, {
    folder: "Flash/Categories/",
    format: "jpg"
  }, (err, result) => {
    if (err) {
      console.log("________________________________");
      console.log(err);
      console.log("________________________________");

    }
  })
}

cloudinaryUploadImages.uploadImagesUserAdmin = image => {
  return cloudinary.uploader.upload(
    image, {
    folder: "Flash/Users/Administrator/",
    format: "jpg",
  },
    (err, result) => {
      if (err) {
        console.log("________________________________");
        console.log(err);
        console.log("________________________________");
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
        console.log("________________________________");
        console.log(err);
        console.log("________________________________");
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
        console.log("________________________________");
        console.log(err);
        console.log("________________________________");
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
>>>>>>> 9cdeaec57e86b6dfc5587a5ce839f6af05d8698f
// })