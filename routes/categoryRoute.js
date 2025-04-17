import express from "express";
import { isAdmin, requireSignIn } from "./../middleware/authMiddleware.js";
import {
  createCategoryController,
  updateCategoryController,
  categoryController,
  singleCatgoryController
} from "../controllers/categoryController.js";

const router = express.Router();

// routes
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

// update category
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

// Getting All Categories
router.get('/get-category', categoryController)

// Getting Single Category
router.get('/single-category/:slug', singleCatgoryController)

export default router;
