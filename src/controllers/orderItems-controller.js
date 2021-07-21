import orderItemsModel from "../models/orderItems-model";
import orderModel from "../models/order-model";
import productModel from "../models/Products-model";

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
      data: orderItems,
    });
  } catch (err) {
    handleError(err, res);
  }
};

exports.addOrderItem = async (req, res, next) => {

  try {
    const orderItem = new orderItemsModel({
      products: req.query.product_id,
      quantity: req.query.quantity,
      totalPrice: req.query.totalPrice,
    });
    const order = await orderModel.findOne({ user: req.user._id });

    orderItem.order = order._id;
    const data = await orderItem.save();

    order.orderItem.push(data._id);

    await order.save();

    const product = await productModel.findById({ _id: orderItem.products });

    product.orderItem.push(orderItem._id);
    await product.save();

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
      _id: req.params.id,
    });

    if (!orderItem) throw new Error("No order Items has been found ");

    if (
      orderItem.quantity !== req.query.orderItem_quantity &&
      req.query.orderItem_quantity !== ""
    ) {
      orderItem.quantity = req.query.orderItem_quantity;
    }

    if (
      orderItem.totalPrice !== req.query.orderItem_totalPrice &&
      req.query.orderItem_totalPrice !== ""
    ) {
      orderItem.totalPrice = req.query.orderItem_totalPrice;
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
      _id: req.params.id,
    });
    if (!orderItem) throw new Error("No order Items has been found ");

    if (orderItem.order) {
      const order = await orderModel.findById({ _id: orderItem.order });

      if (order) order.orderItem.pull(orderItem._id);
      await order.save();
    }

    const product = await productModel.findById({ _id: orderItem.products });
    if (product) {
      product.orderItem.pull(orderItem._id);
      await product.save();
    }

    const deleted = await orderItemsModel.deleteOne({ _id: orderItem._id });
    if (!deleted.ok)
      throw new Error("Failed process: OrderITem couldn't be deleted");

    res.json({
      success: true,
      message: "Order Item deleted successfully",
      orderItem_id: deleted._id,
    });
  } catch (err) {
    handleError(err, res);
  }
};

const handleError = (error, res) => {
  res.json({ success: false, message: error.message });
};
