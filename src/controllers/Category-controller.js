import categoryModel from "../models/Category-model";
import productModel from "../models/Products-model";

exports.getCategory = async (req, res, next) => {
  try {
    const categories = await categoryModel
      .find()
      .populate({ path: "parent_category", select: ["name"] })
      .populate({ path: "product", populate: { path: "images" } });
    if (categories.length === 0)
      throw new Error("No categories has been found");

    res.json({ success: true, data: categories });
  } catch (err) {
    handleError(err, res);
  }
};

exports.addCategory = async (req, res, next) => {
  try {
    const category = await categoryModel.find({ name: req.query.name });
    if (category.length !== 0) throw new Error("Category already exists");

    const newCategory = new categoryModel({
      name: req.query.name,
      parent_category: req.query.category_id,
    });

    const data = await newCategory.save();
    res.json({
      success: true,
      message: "category saved successfully",
      category_id: data._id,
    });
  } catch (err) {
    handleError(err, res);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const category = await categoryModel.findById({ _id: req.params.id });
    if (!category) throw new Error("Category doesn't exists");

    const categories = await categoryModel.find();

    const newCategories = categories.filter(
      (data) => data.name !== category.name
    );

    newCategories.map((category) => {
      if (category.name !== "" && req.query.name !== "") {
        if (category.name.toLowerCase() == req.query.name.toLowerCase()) {
          throw new Error("Category already exists");
        }
      }
    });

    if (req.query.name) category.name = req.query.name;

    if (req.query.parent_category)
      category.parent_category = req.query.parent_category;

    if (req.query.product_id) category.product.push(req.query.product_id);

    const data = await category.save();
    res.json({
      success: true,
      message: "Category updated successfully",
      category_id: data._id,
    });
  } catch (err) {
    handleError(err, res);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await categoryModel.findById({ _id: req.params.id });
    if (!category) {
      throw new Error("Category doesn't exists");
    }

    const products = await productModel.find();

    if (products.length > 0) {
      products.map(async (data) => {

        if (data.category.equals(category._id)) {

          data.category = undefined;
        }
        await data.save();
      });
    }

    const deleted = await categoryModel.deleteOne({ _id: category._id });
    if (!deleted.ok)
      throw new Error("Failed process: category couldn't be deleted"); 

    res.json({
      success: true,
      message: "Category deleted successfully",
      category_id: deleted._id,
    });
  } catch (err) {
    handleError(err, res);
  }
};

const handleError = (error, res) => {
  res.json({ success: false, message: error.message });
};
