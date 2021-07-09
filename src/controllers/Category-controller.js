import categoryModel from "../models/Category-model";

exports.getCategory = async (req, res, next) => {
  try {
    const categories = await categoryModel.find();
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
      parent_category: req.query.id,
    });

    const data = await newCategory.save();
    res.json({ success: true, data: data });
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
      if (category.name.toLowerCase() == req.query.name.toLowerCase()) {
        console.log("entered");
        throw new Error("Category already exists");
      }
    });

    if (req.query.name) {
      category.name = req.query.name;
    }

    const data = await category.save();
    res.json({ success: true, data: data });
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

    const deleted = await categoryModel.deleteOne({ _id: category._id });
    if (!deleted.ok)
      throw new Error("Failed process: category couldn't be deleted");

    res.json({ success: true, message: "Category deleted successfully" });
  } catch (err) {
    handleError(err, res);
  }
};

const handleError = (error, res) => {
  res.json({ success: false, message: error.message });
};
