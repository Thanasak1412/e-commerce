const Cart = require("../models/Cart");
const Product = require("../models/Product");

const getCarts = async (req, res) => {
  try {
    const carts = await Cart.find();

    res.status(200).json({
      success: true,
      carts,
    });
  } catch (error) {
    res.status(500).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

const getCart = async (req, res) => {
  try {
    const { id } = req.params;

    const cart = await Cart.findById(id);

    if (!cart) {
      return res.status(400).json({
        error: `Cannot find cart with the id: ${id}`,
      });
    }

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

const getCartUser = async (req, res) => {
  try {
    const { id } = req.params;
    const savedCart = await Cart.find({ user: id });
    if (!savedCart) {
      return res.status(400).json({
        error: `Cannot find product with the id: ${productId}`,
      });
    }

    const eProducts = await savedCart.map(({ products }) =>
      Product.findById(products[0].product).then((products) => {
        return products;
      })
    );

    const productDoc = await Promise.all(eProducts).then((product) => {
      return product;
    });

    const cartDoc = {
      savedCart,
      productDoc,
    };

    res.status(200).json({
      success: true,
      cart: cartDoc,
    });
  } catch (error) {
    res.status(500).json({
      error: "Your request could not be processed. Please try again." + error,
    });
  }
};

const addCart = async (req, res) => {
  try {
    const user = req.user.id;
    const { product, quantity } = req.body;

    if (!product) {
      return res.status(400).json({
        error: "You must enter an products.",
      });
    }

    if (!quantity) {
      return res.status(400).json({
        error: "You must enter an quantity.",
      });
    }

    const cart = new Cart({
      user,
      products: [
        {
          product,
          quantity,
        },
      ],
    });

    const savedCart = await cart.save();

    const productDoc = await Product.findById(savedCart.products[0].product);

    const cartDoc = {
      savedCart,
      productDoc,
    };

    res.status(201).json({
      success: true,
      message: "Cart has been added successfully!",
      cart: cartDoc,
    });
  } catch (error) {
    res.status(500).json({
      error: "Your request could not be processed. Please try again." + error,
    });
  }
};

const updateCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const foundCart = await Cart.findById(id);
    if (!foundCart) {
      return res.status(400).json({
        error: `Cannot find cart with the id: ${id}`,
      });
    }

    const {
      products: [{ product: productId }],
    } = foundCart;

    const product = await Product.findById(productId);

    const updatedCart = await Cart.findByIdAndUpdate(
      id,
      {
        products: [
          {
            quantity,
            totalPrice: quantity * product.price,
          },
        ],
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Cart has been updated successfully!",
      cart: updatedCart,
    });
  } catch (error) {
    res.status(500).json({
      error: "Your request could not be processed. Please try again." + error,
    });
  }
};

const deleteCart = async (req, res) => {
  try {
    const { id } = req.params;
    await Cart.findByIdAndDelete(id);

    res.status(202).json({
      success: true,
      message: "Cart has been deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

module.exports = {
  getCarts,
  getCart,
  getCartUser,
  addCart,
  updateCart,
  deleteCart,
};
