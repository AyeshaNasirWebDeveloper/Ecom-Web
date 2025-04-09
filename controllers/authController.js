import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
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
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
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

// Test Controller
export const testController = (req,res) => {
  try {
    res.send("Protected Route")
  } catch (error) {
    console.log(error)
    res.send({error})
  }
}