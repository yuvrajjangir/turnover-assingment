// Import the required modules
const express = require('express');
const router = express.Router();

// Import the required controllers and middleware functions
const { getAllCategories, updateUserCategories, createCategories, getCategoriesByLoggedInUser } = require('../controllers/Category');
const { auth } = require('../middleware/auth');

router.use(auth)

// Route for getting categories
router.post('/', createCategories);
router.get('/categories', getAllCategories);

// Route for updating user schema when user select and deselects the categories
router.put('/:userId/:categoryId', updateUserCategories);

// Route for getting categories saved by the logged-in user
router.get("/user", getCategoriesByLoggedInUser);

module.exports = router;