import photoModel from "../models/photos-model.js";
import productSchema from "../models/Products-model.js";
import serviceSchema from "../models/service-models.js";
import fs from "fs/promises";

export const getPhotos = async (req, res, next) => {
  try {
    const photos = await photoModel.find().populate("product");
    if (photos.length === 0) throw new Error("No Photos has been found ");

    res.json({
      success: true,
      message: "Photos has been successfully fetched",
      data: photos,
    });
  } catch (err) {
    handleError(err, res);
  }
};

export const addPhotos = async (req, res, next) => {
  try {
    if (req.files) {
      const photos = [];
      req.files.map((photo) => {
        if (req.body.product_id) {
          photos.push({
            name: photo.originalname.replace(/\.(png|jpg|jpeg|gif)$/, ""),
            url: photo.path.replace(
              /home\/teddy\/Documents\/Projects\/cloned\/ITWorkX-backend\/public\//,
              ""
            ),
            product: req.body.product_id,
          });
        } else if (req.body.service_id) {
          photos.push({
            name: photo.originalname.replace(/\.(png|jpg|jpeg|gif)$/, ""),
            url: photo.path.replace(
              /home\/teddy\/Documents\/Projects\/cloned\/ITWorkX-backend\/public\//,
              ""
            ),
            service: req.body.service_id,
          });
        } else {
          photos.push({
            name: photo.originalname.replace(/\.(png|jpg|jpeg|gif)$/, ""),
            url: photo.path.replace(
              /home\/teddy\/Documents\/Projects\/cloned\/ITWorkX-backend\/public\//,
              ""
            ),
            isCarousel: req.body.isCarousel,
          });
        }
      });

      const data = await photoModel.insertMany(photos);
      if (data.length === 0) throw new Error("Photos hasn't been saved");

      if (req.body.product_id !== "" && req.body.product_id !== undefined) {
        const product = await productSchema.findById({
          _id: req.body.product_id,
        });
        const push = [];

        data.map((image) => {
          push.push(image._id);
        });

        product.images.push({ $each: push });

        await product.save();
      }

      if (req.body.service_id !== "" && req.body.service_id !== undefined) {
        const service = await serviceSchema.findById({
          _id: req.body.service_id,
        });
        const push = [];

        data.map((image) => {
          push.push(image._id);
        });

        service.imageUrl.push({ $each: push });

        await service.save();
      }

      res.json({
        success: true,
        message: "Photos has been successfully saved",
        photo: data,
      });
    } else {
      throw new Error("No photo's has been detected");
    }
  } catch (err) {
    handleError(err, res);
  }
};

export const deletePhotoById = async (req, res, next) => {
  try {
    const photo = await photoModel.findById({ _id: req.params.id });
    if (!photo) throw new Error("Photo doesn't exist");

    await fs.unlink(`public${photo.url}`);

    if (photo.product !== undefined) {
      const product = await productSchema.findById({ _id: photo.product });

      if (product) {
        product.images.pull(photo._id);

        await product.save();
      }
    }

    if (photo.service !== undefined) {
      const service = await serviceSchema.findById({ _id: photo.service });

      if (service) {
        service.imageUrl.pull(photo._id);

        await service.save();
      }
    }
    const deleted = await photoModel.deleteOne({ _id: photo._id });
    if (!deleted.ok) throw new Error("Photo hasn't been deleted");

    res.json({
      success: true,
      message: "Photo has been successfully deleted",
      photo_id: deleted._id,
    });
  } catch (err) {
    handleError(err, res);
  }
};

const handleError = (error, res) => {
  res.json({ success: false, message: error.message });
};
