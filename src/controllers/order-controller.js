import orderModel from "../models/order-model";
import orderItemsModel from "../models/orderItems-model";

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await orderModel
      .find()
      .populate("user")
      .populate("orderItem");

    if (orders.length === 0) throw new Error("No orders has been found ");
    res.json({
      success: true,
      message: "Successfully retrieved orders",
      data: orders,
    });
  } catch (err) {
    handleError(err, res);
  }
};

exports.addOrder = async (req, res, next) => {
  try {
    const order = new orderModel({
      user: req.query.user_id,
    });

    const data = await order.save();
    res.json({
      success: true,
      message: "Successfully saved order",
      order_id: data._id,
    });
  } catch (err) {
    handleError(err, res);
  }
};

exports.updateOrder = (req, res, next) => {};

exports.deleteOrder = async (req, res, next) => {
  try {
    const order = await orderModel.findById({ _id: req.params.id });
    if (!order) throw new Error("No order has been found");
    if (order.orderItem.length > 0) {
      order.orderItem.map(async (value) => {
        const orderItem = await orderItemsModel.deleteOne({ _id: value });
        if (!orderItem.ok) throw new Error("order Item not deleted");
      });
    }

    const deleted = await orderModel.deleteOne({ _id: order._id });
    if (!deleted.ok) throw new Error("Order not deleted");

    res.json({
      success: true,
      message: "order deleted successfully",
      order_id: deleted._id,
    });
  } catch (err) {
    handleError(err, res);
  }
};

const handleError = (error, res) => {
  res.json({ success: false, message: error.message });
};
