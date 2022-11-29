const express = require('express');
const router = express.Router();

const categoryController = require("../controller/categoryController");
const { validateAddOrUpdateCategoryRequest } = require('../middlewares/validation.middleware/requestValidator');

router.post("/create", validateAddOrUpdateCategoryRequest, categoryController.create);
router.get("/categories", categoryController.fetchAllCategories);
router.get("/:categoryId", categoryController.fetchCategoryByID);
router.get("/categoryByName/:name", categoryController.fetchCategoryByName);

module.exports = router;