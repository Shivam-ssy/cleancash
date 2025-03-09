
import {CloudinaryStorage} from "multer-storage-cloudinary"
import { cloudinary } from "../utility/cloudinary.js";
import multer from "multer";
// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "uploads",
//     allowed_formats: ["jpg", "png"],
//   },
// });

// export const upload = multer({ storage });
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true); // Accept file
    } else {
      cb(new Error("Only JPEG and PNG images are allowed!"), false); 
    }
  };
  
export const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 }, 
    fileFilter: fileFilter,
  });

