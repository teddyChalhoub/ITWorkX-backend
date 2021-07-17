import orderItemsModel from "../models/orderItems-model";
import orderModel from "../models/order-model";

exports.getAllOrderItems = async (req, res, next) => {
  try {
    const orderItems = await orderItemsModel
      .find()
      .populate("products")
      .populate("order");

    if (orderItems.length === 0)
      throw new Error("No order Items has been found ");
    res.json({
      success: true,
      message: "Successfully retrieved order Items",
      orderItem: orderItems,
    });
  } catch (err) {
    handleError(err, res);
  }
};

exports.addOrderItem = async (req, res, next) => {
  try {
    const orderItem = new orderItemsModel({
      order: req.body.order_id,
      products: req.body.product_id,
      quantity: req.body.quantity,
      totalPrice: req.body.totalPrice,
    });
    const order = await orderModel.findOne({ user: req.body.user_id });

    orderItem.order = order._id;
    const data = await orderItem.save();

    order.orderItem.push(data._id);

    await order.save();

    res.json({
      success: true,
      message: "Successfully saved order",
      orderItem_id: data._id,
    });
  } catch (err) {
    handleError(err, res);
  }
};

exports.updateOrderItem = async (req, res, next) => {
  try {
    const orderItem = await orderItemsModel.findById({
      _id: req.body.orderItem_id,
    });

    if (!orderItem) throw new Error("No order Items has been found ");

    if (
      orderItem.quantity !== req.body.orderItem_quantity &&
      req.body.orderItem_quantity !== ""
    ) {
      orderItem.quantity = req.body.orderItem_quantity;
    }

    if (
      orderItem.totalPrice !== req.body.orderItem_totalPrice &&
      req.body.orderItem_totalPrice !== ""
    ) {
      orderItem.totalPrice = req.body.orderItem_totalPrice;
    }

    const data = await orderItem.save();

    res.json({
      success: true,
      message: "Successfully updated order",
      orderItem_id: data._id,
    });
  } catch (err) {
    handleError(err, res);
  }
};

exports.deleteOrderItem = async (req, res, next) => {
  try {
    const orderItem = await orderItemsModel.findById({
      _id: req.body.orderItem_id,
    });
    if (!orderItem) throw new Error("No order Items has been found ");

    const order = await orderModel.findById({ _id: orderItem.order });

    if (order) order.orderItem.pull(orderItem._id);

    const deleted = await orderItemsModel.deleteOne({ _id: orderItem._id });
    if (!deleted.ok)
      throw new Error("Failed process: OrderITem couldn't be deleted");

    res.json({ success: true, message: "Order Item deleted successfully" });
  } catch (err) {
    handleError(err, res);
  }
};

const handleError = (error, res) => {
  res.json({ success: false, message: error.message });
};
