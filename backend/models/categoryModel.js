import mongoose from "mongoose";
// const { Schema } = mongoose;

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
    // trim: true,
    // unique: true
  },
  slug: {
    type: String,
    // required: true,
    // unique: true,
    lowercase: true
  }
} // { timestamps: true }
);

// Export the model
export default mongoose.models.Category || mongoose.model("Category", categorySchema);
