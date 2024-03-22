const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // Define the name field with type String, required, and trimmed
  name: {
    type: String,
    required: true,
    trim: true,
  },
  // Define the email field with type String, required, and trimmed
  email: {
    type: String,
    required: true,
    trim: true,
  },
  // Define the password field with type String and required
  password: {
    type: String,
    required: true,
  },
  //   define the Catrgories array field with reference id to categories
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
});

module.exports = mongoose.model("user", userSchema);
