import slugify from "slugify";
import CategoryModel from "../models/categoryModel.js";

// Category Controller
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({
        message: "Name is Required!",
      });
    }
    // Checking Existing Category
    const existingCategory = await CategoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: "Category Already Exists",
      });
    }
    const category = await new CategoryModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "New Category is created!",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Category!",
    });
  }
};

// Update Category Controller
export const updateCategoryController = async (req,res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await CategoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Category Updated Successfully!",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error found during Updation of Category!",
    });
  }
};

// Getting all categories
export const categoryController = async (req,res) => {
  try {
    const category = await CategoryModel.find({})
    res.status(200).send({
      success: true,
      message: "All Categories List",
      category,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      error,
      message: "Error found for getting All Categories!"
    })
  }
}

// Getting Single Category
export const singleCatgoryController = async (req,res) => {
  try {
    const category = await CategoryModel.findOne({slug:req.params.slug})
    res.status(200).send({
      success:true,
      message: "Got It Single Category Successfully!",
      category
    })
  } catch {
    console.log(error)
    res.status(500).send({
      success: false,
      error,
      message: "Error found for getting Single Category!"
    })
  }
}

// Delete Category Controller
export const deleteCategoryController = async (req,res) => {
  try {
    const {id} = req.params
    await CategoryModel.findByIdAndDelete(id)
    res.status(200).send({
      success: true,
      message: "Category Deleted Successfully!"
    })
  } catch( error) {
  console.log(error)
  res.status(500).send({
    success: false,
    message: "Error while Deleting Category!",
    error
  })
}
};