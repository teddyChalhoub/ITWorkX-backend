import productSchema from "../models/Products-model";

exports.getProducts = async (req, res, next) => {
  try {
    const products = await productSchema.find();

    if (products.length === 0) throw Error("No products has been found");

    res.json({ success: true, data: products });
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
    });

    const newProduct = await product.save();

    res.json({ success: true, message: "Product saved successfully " });
  } catch (err) {
    handleError(err, res);
  }
};

exports.updateProducts = async (req, res, next) => {
  try {
    const products = await productSchema.findById({ _id: req.params.id });
    if (!products) throw Error("Product doesn't exists");

    if (req.query.title != undefined && products.title != req.query.title)
      products.title = req.query.title;

    if (
      req.query.subTitle != undefined &&
      products.subTitle != req.query.subTitle
    )
      products.subTitle = req.query.subTitle;

    if (req.query.price != undefined && products.price != req.query.price)
      products.price = req.query.price;

    if (
      req.query.description != undefined &&
      products.description != req.query.description
    )
      products.description = req.query.description;

    if (
      req.query.numberOfAvailability != undefined &&
      products.numberOfAvailability != req.query.numberOfAvailability
    )
      products.numberOfAvailability = req.query.numberOfAvailability;

    if (
      req.query.isAvailable != undefined &&
      products.isAvailable != req.query.isAvailable
    )
      products.isAvailable = req.query.isAvailable;

    const data = await products.save();

    res.json({ success: true, message: "Product updated successfully" });
  } catch (err) {
    handleError(err, res);
  }
};

exports.deleteProducts = async (req, res, next) => { 
  try {
    const products = await productSchema.findById({ _id: req.params.id });
    if (!products) {
      throw new Error("Product doesn't exists");
    }

    const deleted = await productSchema.deleteOne({ _id: products._id });
    if (!deleted.ok)
      throw new Error("Failed process: product couldn't be deleted");

    res.json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    handleError(err, res);
  } 
};

const handleError = (error, res) => {
  res.json({ success: false, message: error.message });
};
