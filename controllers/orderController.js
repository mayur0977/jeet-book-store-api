// controllers/orderController.js
const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');

exports.createOrder = async (req, res, next) => {
  const userId = req.user.userId; // Assuming you've extracted userId from JWT

  try {
    const cart = await Cart.findOne({ user: userId }).populate('items.book');
    if (!cart) {
      return res.status(200).json({
        status: 'success',
        message: '',
        data: null,
      });
    }

    const orderItems = cart.items.map((item) => ({
      book: item.book._id,
      quantity: item.quantity,
    }));

    const totalPrice = cart.items.reduce((total, item) => {
      return total + item.book.price * item.quantity;
    }, 0);

    const order = new Order({
      user: userId,
      items: orderItems,
      totalPrice,
    });

    await order.save();

    // Clear the cart after placing the order
    await Cart.findOneAndDelete({ user: userId });

    res.status(200).json({
      status: 'success',
      message: 'Order created , Please check your email',
      data: { order },
    });
  } catch (error) {
    next(error);
  }
};

exports.getOrderDetails = async (req, res, next) => {
  const userId = req.user.userId; // Assuming you've extracted userId from JWT

  try {
    const order = await Order.find({ user: userId }).populate({
      path: 'items.book',
      select: 'title subTitle thumbnail price previewLink',
    });
    if (!order) {
      return res.status(200).json({
        status: 'success',
        message: '',
        data: null,
      });
    }

    res.status(200).json({
      status: 'success',
      message: '',
      data: { order },
    });
  } catch (error) {
    next(error);
  }
};
