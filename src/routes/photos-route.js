import express from "express";
import {
  getPhotos,
  addPhotos,
  deletePhotoById,
} from "../controllers/photos-controller.js";
import multer from "multer";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const imageStorage = multer.diskStorage({
  destination: path.join(__dirname, "../../public/images"),

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const imageUpload = multer({
  storage: imageStorage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg|gif)$/)) {
      return cb(new Error("Only png and jpg image format are valid"));
    }
    cb(null, true);
  },
});

const router = express.Router();

router.use("/", (req, res, next) => next());

router.get("/", getPhotos);
router.post("/add", imageUpload.array("images", 5), addPhotos);
router.delete("/delete/:id", deletePhotoById);

export default router;
