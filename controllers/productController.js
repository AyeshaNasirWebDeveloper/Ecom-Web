import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from "fs";

// Create Product Controller
export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity } = req.fields;
    const { photo } = req.files;
    // Validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required!" });
      case !description:
        return res.status(500).send({ error: "Description  is Required!" });
      case !price:
        return res.status(500).send({ error: "Price is Required!" });
      case !category:
        return res.status(500).send({ error: "Category is Required!" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required!" });
      case photo && photo.size > 1000000: //1000000
        return res
          .status(500)
          .send({ error: "Photo is Required & should be less than 1mb" });
    }
    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save(); // Photos are also saved
    res.status(201).send({
      success: true,
      message: "Product Created Successfully!",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      error,
      message: "Error in Creating a Product!",
    });
  }
};

// get all Products
export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      totalCount: products.length,
      message: "All Products!",
      products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in getting products!",
      error: error.message,
    });
  }
};

// get single product
export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Product Fetched!",
      product,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in getting a products!",
      error: error.message,
    });
  }
};

// get photo
export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");

    if (!product || !product.photo || !product.photo.data) {
      return res.status(404).send({
        success: false,
        message: "Photo not found",
      });
    }

    res.set("Content-Type", product.photo.contentType || "image/jpeg");
    return res.send(product.photo.data);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while getting photo",
      error: error.message,
    });
  }
};

// Delete Product Controller
export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Deleted Successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting the product",
      error: error.message,
    });
  }
};

// Update Product Controller
export const updateProductController = async (req,res) => {
    try {
        const { name, description, price, category, quantity } = req.fields;
        const { photo } = req.files;
        // Validation
        switch (true) {
          case !name:
            return res.status(500).send({ error: "Name is Required!" });
          case !description:
            return res.status(500).send({ error: "Description  is Required!" });
          case !price:
            return res.status(500).send({ error: "Price is Required!" });
          case !category:
            return res.status(500).send({ error: "Category is Required!" });
          case !quantity:
            return res.status(500).send({ error: "Quantity is Required!" });
          case photo && photo.size > 1000000: //1000000
            return res
              .status(500)
              .send({ error: "Photo is Required & should be less than 1mb" });
        }
        const products = await productModel.findByIdAndUpdate(req.params.pid, {...req.fields, slug:slugify(name)}, {new:true})
        if (photo) {
          products.photo.data = fs.readFileSync(photo.path);
          products.photo.contentType = photo.type;
        }
        await products.save(); // Photos are also saved
        res.status(201).send({
          success: true,
          message: "Product Updated Successfully!",
          products,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: true,
          error,
          message: "Error in updating a Product!",
        });
      }
};