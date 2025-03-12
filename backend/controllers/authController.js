import userModel from "../models/userModel.js";
import { hashPassword } from './../helpers/authHelper.js';


export const registerController = async(req,res) =>{
    try {
        const {name,email,password,phone,address} = req.body
        // validation for Name
        if (!name) {
            return res.status(400).send({
                error: "Name is Required!"
            });
        }
        // validation for Email
        if (!email) {
            return res.status(400).send({
                error: "Email is Required!"
            });
        }
        // validation for Password
        if (!password) {
            return res.status(400).send({
                error: "Password is Required!"
            });
        }
        // validation for Phone
        if (!phone) {
            return res.status(400).send({
                error: "Phone number is Required!"
            });
        }
        // validation for Address
        if (!address) {
            return res.status(400).send({
                error: "Address is Required!"
            });
        }

        // Find User
        const existingUser = await userModel.findOne({email})
        // Checking for Existing Users
        if(existingUser){
            return res.status(200).send({
                success: true,
                message: "Already have an account! Please login"
            })
        }

        // register user
        const hashedPassword = await hashPassword(password)

        // save password
        const user = await new userModel({name,email,password:hashedPassword,phone,address}).save()
        res.status(201).send({
            success: true,
            message: "Registered Succesfully!",
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Registration!",
            error: ""
        })
    }
};