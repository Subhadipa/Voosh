const orderModel = require("../models/orderModel");
const userModel = require("../models/userModel");

const outerFunc = {
  craeteOrder: async (req, res) => {
    try {
      let orderData = req.body;
      const { user_id, sub_total, phone } = req.body;

      if (user_id != req.userId) {
        return res.status(400).send({
          status: false,
          message:
            "You are not authorize to create this order with this user Id",
        });
      }

      let userFound = await userModel.findById(user_id);
      if (userFound) {
        if (userFound.phone == phone) {
          let orderDbData = await orderModel.create(orderData);
          return res.status(200).send({
            status: true,
            message: "New order created successfully!",
            jobDetails: orderDbData,
          });
        } else {
          return res.status(400).send({
            status: false,
            message: "Phone number is incorrect!",
          });
        }
      } else {
        return res.status(400).send({
          status: false,
          message: "No user exist with this userId!",
        });
      }
    } catch (error) {
      return res.status(500).send({ message: false, error: error.message });
    }
  },
  getOrder: async (req, res) => {
    try {
      userId = req.query.user_id;
      if (userId != req.userId) {
        return res.status(400).send({
          status: false,
          message:
            "You are not authorize to fetch this order details with this user Id",
        });
      }
      let orderdbDetails = await orderModel.find({ user_id: userId });
      if (orderdbDetails.length==0) {
        return res.status(400).send({
          status: false,
          message: "No order found with this userId!",
        });
      } else {
        return res.status(200).send({
          status: true,
          message: "Order fetched successfully!",
          orderDetails: orderdbDetails,
        });
      }
    } catch (error) {
      return res.status(500).send({ message: false, error: error.message });
    }
  },
};

module.exports = outerFunc;
