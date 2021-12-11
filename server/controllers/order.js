const Order = require("../models/Order");
const Mongoose = require("mongoose");

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

const getOrderUser = async (req, res) => {
  try {
    const { id } = req.params;
    const orderUser = await Order.find({ user: id });
    res.status(200).json({
      success: true,
      orderUser,
    });
  } catch (error) {
    res.status(500).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

const getOrderIncome = async (req, res) => {
  try {
    // const { productId } = req.query;
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const prevMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    const income = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: prevMonth,
          },
        },
      },
      {
        $lookup: {
          from: "carts",
          let: { cartId: "$cart" },
          pipeline: [
            {
              $match: {
                $and: [
                  {
                    $expr: {
                      $eq: ["$$cartId", "$_id"],
                    },
                  },
                  // productId && {
                  //   "products.product": new Mongoose.Types.ObjectId(productId),
                  // },
                ],
              },
            },
          ],
          as: "cart",
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$total",
        },
      },
      {
        $group: {
          _id: "$month",
          total: {
            $sum: "$sales",
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      orderIncome: income,
    });
  } catch (error) {
    res.status(500).json({
      error: "Your request could not be processed. Please try again." + error,
    });
  }
};

const addOrder = async (req, res) => {
  try {
    const user = req.user.id;
    const { cartId, total } = req.body;

    if (!cartId) {
      return res.status(400).json({
        error: "You must enter a cart.",
      });
    }

    if (!total) {
      return res.status(400).json({
        error: "You must enter a total price.",
      });
    }

    const order = new Order({
      cart: cartId,
      user,
      total,
    });

    const savedOrder = await order.save();

    res.status(201).json({
      success: true,
      message: "Your order has been placed successfully!",
      order: savedOrder,
    });
  } catch (error) {
    res.status(500).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { cartId, total } = req.body;

    if (!id) {
      return res.status(400).json({
        error: "Cart not found.",
      });
    }

    if (!total) {
      return res.status(400).json({
        error: "Your must enter an total",
      });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        cart: cartId,
        total,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Your order has been updated successfully!",
      order: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    await Order.findByIdAndDelete(id);

    res.status(202).json({
      success: true,
      message: "Your order has been deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

module.exports = {
  getOrders,
  getOrderUser,
  getOrderIncome,
  addOrder,
  updateOrder,
  deleteOrder,
};
