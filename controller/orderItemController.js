const { OrderItem } = require("../models");

exports.createOrder = async (req, res, next) => {
  try {
    const orderItem = await Order.OrderItem({ employeeId: req.user.id });
    res.status(200).json({ order });
  } catch (err) {
    next(err);
  }
};