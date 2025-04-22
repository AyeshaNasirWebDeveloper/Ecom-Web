import express from "express";
import { isAdmin, requireSignIn } from "./../middleware/authMiddleware.js";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFiltersController,
  productListController,
  productPhotoController,
  realtedProductController,
  searchProductController,
  updateProductController,
} from "./../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

// Routes

// create product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

// update product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

// get products
router.get("/get-product", getProductController);

// Single Product
router.get("/get-product/:slug", getSingleProductController);

// get photo
router.get("/product-photo/:pid", productPhotoController);

// delete product
router.delete("/product/:pid", deleteProductController);

//filter product
router.post("/product-filters", productFiltersController);

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//search product
router.get("/search/:keyword", searchProductController);

//similar product
router.get("/related-product/:pid/:cid", realtedProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);

// //payments routes
// //token
// router.get("/braintree/token", braintreeTokenController);

// //payments
// router.post("/braintree/payment", requireSignIn, brainTreePaymentController);

export default router;
