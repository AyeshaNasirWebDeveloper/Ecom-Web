import express from "express";
import { registerController , loginController, testController, forgotPasswordController } from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";

// router object
const router = express.Router();

// routing

// REGISTER || METHOD POST
router.post("/register", registerController);

// LOGIN || METHOD POST
router.post("/login", loginController);

// FORGOT PASSWORD || POST
router.post('/forgot-password', forgotPasswordController)

// TEST ||  METHOD GET
router.get('/test', requireSignIn, isAdmin ,testController)

// protected route auth for user
router.get('/user-auth', requireSignIn, (req,res) => {
    res.status(200).send({ok:true});
})

// protected route auth for Admin
router.get('/admin-auth', requireSignIn, isAdmin, (req,res) => {
    res.status(200).send({ok:true});
})

export default router;