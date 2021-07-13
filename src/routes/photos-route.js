import express from "express";
import photoController from "../controllers/photos-controller";
import multer from "multer";

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + "-" + file.originalname
    );
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

router.get("/", photoController.getPhotos);
router.post("/add", imageUpload.array("images", 5), photoController.addPhotos);
router.delete("/delete/:id", photoController.deletePhotoById);

module.exports = router;
