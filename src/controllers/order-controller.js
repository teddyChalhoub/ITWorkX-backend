import orderModel from "../models/order-model";

exports.getAllOrders = (req, res, next) => {
  try {
    const orders = await orderModel
      .find()
      .populate("user")
      .populate("orderItem");

    if (orders.length === 0) throw new Error("No orders has been found ");
    res.json({
      success: true,
      message: "Successfully retrieved orders",
      orderItem: orders,
    });
  } catch (err) {
    handleError(err, res);
  }
};

exports.addOrder = (req, res, next) => {
  try {
    const order = new orderModel({
      user: req.body.user_id,
    });

    const data = await order.save();
    res.json({
      success: true,
      message: "Successfully saved order",
      orderItem_id: data._id,
    });
  } catch (err) {
    handleError(err, res);
  }
};

exports.updateOrder = (req, res, next) => {};

exports.deleteOrder = (req, res, next) => {};

const handleError = (error, res) => {
  res.json({ success: false, message: error.message });
};
