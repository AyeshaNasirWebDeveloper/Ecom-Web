import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    // validation for Name
    if (!name) {
      return res.status(400).send({
        message: "Name is Required!",
      });
    }
    // validation for Email
    if (!email) {
      return res.status(400).send({
        message: "Email is Required!",
      });
    }
    // validation for Password
    if (!password) {
      return res.status(400).send({
        message: "Password is Required!",
      });
    }
    // validation for Phone
    if (!phone) {
      return res.status(400).send({
        message: "Phone number is Required!",
      });
    }
    // validation for Address
    if (!address) {
      return res.status(400).send({
        message: "Address is Required!",
      });
    }
    // validation for Answer
    if (!address) {
      return res.status(400).send({
        message: "Answer is Required!",
      });
    }


    // Find User
    const existingUser = await userModel.findOne({ email });
    // Checking for Existing Users
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already have an account! Please login",
      });
    }

    // register user
    const hashedPassword = await hashPassword(password);

    // save password
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      answer
    }).save();
    res.status(201).send({
      success: true,
      message: "Registered Succesfully!",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration!",
      error,
    });
  }
};

// POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password)
      return res.status(404).send({
        success: false,
        message: "Invalid Email or Password!",
      });

    // Check User
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not Registered!",
      });
    }

    // Password comparison Check if use exist
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }

    // Token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login Successfully!",
      // Storing user data
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role 
      },
      token,
    });


  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Login Error!",
      error,
    });
  }
};

// Forgot Password Controller
export const forgotPasswordController = async (req,res) => {
  try {
    const {email, answer, newPassword} = req.body
    if (!email) {
      res.status(400).send({message: 'Email is Required!'})
    }
    if (!answer) {
      res.status(400).send({message: 'Answer is Required!'})
    }
    if (!newPassword) {
      res.status(400).send({message: 'New Password is Required!'})
    }

    // Checking Email & Password
    const user = await userModel.findOne({email, answer})

    // Validation
    if (!user) {
      return res.status(404).send({
        success:false,
        message: "Wrong Email OR Answer!"
      })
    }

    // Hashed Password
    const hashed = await hashPassword(newPassword)
    await userModel.findByIdAndUpdate(user._id, {password:hashed})
    res.status(200).send({
      success: true,
      message: "Reset Password Successfully!"
    });

  } catch (error) {
    console.log(error)
    res.status(500).send({
      sucess: false,
      message: "Something Went Wrong! :anguished:",
      error
    })
  }
}


// Test Controller
export const testController = (req,res) => {
  try {
    res.send("Protected Route")
  } catch (error) {
    console.log(error)
    res.send({error})
  }
}

//update prfole
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        email: email || user.email,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
};

// Get all orders (admin)
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate({
        path: 'products',
        select: '-photo',
      })
      .populate({
        path: 'buyer',
        select: 'name email',
      })
      .sort({ createdAt: -1 }) 
      .lean(); // Convert to plain JavaScript objects

    if (!orders || orders.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No orders found",
        orders: []
      });
    }

    res.status(200).json({
      success: true,
      message: "All orders fetched successfully",
      orders
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({
      success: false,
      message: "Error while getting orders",
      error: error.message // Send only error message in production
    });
  }
};


// Get user orders
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate({
        path: 'products',
        select: 'name price description',
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "User orders fetched successfully",
      orders
    });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({
      success: false,
      message: "Error while getting user orders",
      error: error.message
    });
  }
};


// Update order status
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    // Validate status input
    const validStatuses = ["Not Process", "Processing", "Shipped", "Delivered", "Cancel"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value"
      });
    }

    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true, runValidators: true }
    ).populate('buyer', 'name email');

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order: updatedOrder
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({
      success: false,
      message: "Error while updating order",
      error: error.message
    });
  }
};


// Checkout controller
export const checkoutController = async (req, res) => {
  try {
    const { cart } = req.body;
    const user = req.user;

    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty or invalid"
      });
    }

    // Calculate total
    const total = cart.reduce((sum, item) => {
      return sum + (item.price * (item.quantity || 1));
    }, 0);

    const order = new orderModel({
      products: cart.map(item => ({
        _id: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
        description: item.description
      })),
      buyer: user._id,
      status: "Not Process",
      total, // Add total to order
      payment: {
        success: true,
        method: "COD"
      }
    });

    await order.save();

    // Populate the response
    const populatedOrder = await orderModel.findById(order._id)
      .populate('buyer', 'name email')
      .populate('products._id', 'name price');

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: populatedOrder
    });
  } catch (error) {
    console.error("Error during checkout:", error);
    res.status(500).json({
      success: false,
      message: "Error while creating order",
      error: error.message
    });
  }
};