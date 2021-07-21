import productSchema from "../models/Products-model";
import categoryModel from "../models/Category-model";
import photoModel from "../models/photos-model";
import fs from "fs/promises";

exports.getProducts = async (req, res, next) => {
  try {
    const products = await productSchema
      .find()
      .populate("images")
      .populate({ path: "category", select: ["name"] });
    if (products.length === 0) throw Error("No products has been found");

    res.json({
      success: true,
      message: "products retrieved successfully",
      data: products,
    });
  } catch (err) {
    handleError(err, res);
  }
};

exports.getProductsByTitle = async (req, res, next) => {
  try {
    const product = await productSchema
      .findOne({ title: req.params.title })
      .populate({ path: "images", select: ["name", "url"] });
    if (product.length === 0) throw Error("No product has been found");

    res.json({
      success: true,
      message: "product retrieved successfully",
      data: product,
    });
  } catch (err) {
    handleError(err, res);
  }
};

exports.addProducts = async (req, res, next) => {
  try {
    let product = new productSchema({
      title: req.query.title,
      subTitle: req.query.subTitle,
      price: req.query.price,
      description: req.query.description,
      numberOfAvailability: req.query.numberOfAvailability,
      isAvailable: req.query.isAvailable,
      newItem: req.query.newItem,
      discount: req.query.discount,
      category: req.query.category_id,
    });

    if (!req.query.isAvailable) product.isAvailable = true;
    if (!req.query.newItem) product.newItem = true;

    const newProduct = await product.save();
    if (req.query.category_id) {
      const category = await categoryModel.findById({
        _id: req.query.category_id,
      });

      category.product.push(newProduct._id);
      await category.save();
    }

    res.json({
      success: true,
      message: "Product saved successfully ",
      product_id: newProduct._id,
    });
  } catch (err) {
    handleError(err, res);
  }
};

exports.updateProductsById = async (req, res, next) => {
  try {
    const products = await productSchema.findById({ _id: req.params.id });
    if (!products) throw Error("Product doesn't exists");

    if (req.query.title != "" && products.title != req.query.title)
      products.title = req.query.title;

    if (req.query.subTitle != "" && products.subTitle != req.query.subTitle)
      products.subTitle = req.query.subTitle;

    if (req.query.price != "" && products.price != req.query.price)
      products.price = req.query.price;

    if (
      req.query.description != "" &&
      products.description != req.query.description
    )
      products.description = req.query.description;

    if (
      req.query.numberOfAvailability != "" &&
      products.numberOfAvailability != req.query.numberOfAvailability
    )
      products.numberOfAvailability = req.query.numberOfAvailability;

    if (
      req.query.isAvailable != "" &&
      products.isAvailable != req.query.isAvailable
    )
      products.isAvailable = req.query.isAvailable;

    if (req.query.newItem !== "" && req.query.newItem !== products.newItem)
      products.newItem = req.query.newItem;

    if (req.query.discount !== "" && req.query.discount !== products.discount)
      products.discount = req.query.discount;

    if (
      req.query.category_id !== "" &&
      req.query.category_id !== products.category
    ) {
      products.category = req.query.category_id;
      const category = await categoryModel.findById({
        _id: req.query.category_id,
      });

      category.product.push(products._id);

      await category.save();
    }
    const data = await products.save();

    res.json({
      success: true,
      message: "Product updated successfully",
      product_id: data._id,
    });
  } catch (err) {
    handleError(err, res);
  }
};

exports.deleteProductsById = async (req, res, next) => {
  try {
    const products = await productSchema.findById({ _id: req.params.id });
    if (!products) {
      throw new Error("Product doesn't exists");
    }

    if (products.category) {
      const category = await categoryModel.findById({
        _id: products.category._id,
      });
      if (category) category.product.pull(products._id);
      await category.save();
    }

    if (products.images.length > 0) {
      products.images.map(async (image) => {
        const photo = await photoModel.findById({
          _id: image,
        });

        await fs.unlink(`public${photo.url}`);

        await photoModel.deleteOne({ _id: photo._id });
      });
    }

    const deleted = await productSchema.deleteOne({ _id: products._id });
    if (!deleted.ok)
      throw new Error("Failed process: product couldn't be deleted");

    res.json({
      success: true,
      message: "Product deleted successfully",
      product_id: deleted._id,
    });
  } catch (err) {
    handleError(err, res);
  }
};

const handleError = (error, res) => {
  res.json({ success: false, message: error.message });
};
