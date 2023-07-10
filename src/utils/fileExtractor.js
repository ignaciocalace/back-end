import multer from "multer";
import fs from "fs";
import { errors } from "../errors/errors.js";
import { usersService } from "../services/users.service.js";
import { errorHandler } from "../middlewares/errorsHandler.js";

const storage = multer.diskStorage({
  filename: async function (req, file, cb) {
    let uid = req.params.uid;
    const user = await usersService.findUserId(uid);
    if (!user) {
      return new errorHandler(errors.NOT_FOUND, req, req.res);
    }
    cb(null, `${uid}-${file.fieldname}`);
  },
  destination: function (req, file, cb) {
    let destinationFolder = "";
    function createDirectoryIfNotExists(path) {
      if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true });
      }
    }

    const profileFolder = "public/uploads/profiles";
    const productFolder = "public/uploads/products";
    const documentFolder = "public/uploads/documents";

    if (file.fieldname === "profile") {
      createDirectoryIfNotExists(profileFolder);
      destinationFolder = profileFolder;
    } else if (file.fieldname === "product") {
      createDirectoryIfNotExists(productFolder);
      destinationFolder = productFolder;
    } else if (
      file.fieldname === "docId" ||
      file.fieldname === "docAdress" ||
      file.fieldname === "docAccount"
    ) {
      createDirectoryIfNotExists(documentFolder);
      destinationFolder = documentFolder;
    }

    cb(null, destinationFolder);
  },
});

const uploader = multer({ storage: storage });

export function extractFile(fieldName) {
  return uploader.any(fieldName);
}
