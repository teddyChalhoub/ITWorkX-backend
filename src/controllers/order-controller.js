import orderModel from "../models/order-model";
import orderItemsModel from "../models/orderItems-model";
import productModel from "../models/Products-model";

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

exports.getAllOrdersByUser = async (req, res, next) => {
  try {
    const order = await orderModel
      .findOne({ user: req.user._id })
      .populate({
        path: "user",
        populate: { path: "user_role", populate: { path: "role_id" } },
      })
      .populate({
        path: "orderItem",
        populate: { path: "products", select: ["title", "price", "images"] },
      });

    if (!order) throw new Error("No order has been found ");

    res.json({
      success: true,
      message: "Successfully retrieved user order",
      data: order,
    });
  } catch (err) {
    handleError(err, res);
  }
};

exports.addOrder = async (req, res, next) => {
  try {
    const order = new orderModel({
      user: req.body.user_id,
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
        const orderItem = await orderItemsModel.findById({ _id: value });

        const product = await productModel.findById({
          _id: orderItem.products,
        });

        product.orderItem.pull(orderItem._id);
        await product.save();

        const deleteOrderItem = await orderItemsModel.deleteOne({
          _id: orderItem._id,
        });
        if (!deleteOrderItem.ok) throw new Error("order Item not deleted");
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
