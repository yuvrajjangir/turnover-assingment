const User = require("../models/User");
const Category = require("../models/Category");
const { faker } = require("@faker-js/faker");

exports.createCategories = async (req, res, next) => {
  try {
    await Category.deleteMany({});

    const categories = new Array(100).fill(undefined).map(() => ({
      category: faker.commerce.productName(),
    }));

    const createdCategories = await Category.insertMany(categories);

    return res.status(200).json({
      success: true,
      categories: createdCategories,
      message: "Categories created successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 6;
    const skip = (page - 1) * limit;

    const totalCategories = await Category.countDocuments();
    const totalPages = Math.ceil(totalCategories / limit);

    const categories = await Category.find().skip(skip).limit(limit).exec();

    res.status(200).json({
      categories,
      currentPage: page,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateUserCategories = async (req, res) => {
  const { userId, categoryId } = req.params;
  const { isSelected } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (isSelected) {
      if (!user.categories.includes(categoryId)) {
        user.categories.push(categoryId);
      }
    } else {
      user.categories = user.categories.filter(
        (id) => id.toString() !== categoryId.toString()
      );
    }

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getCategoriesByLoggedInUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate("categories");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const categories = user.categories;

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
