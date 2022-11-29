const express = require('express');
const router = express.Router();
const productController = require("../controller/productController");
const { validateAccessToken, validateAdmin } = require('../middlewares/auth.middlewares/authorization.middleware');
const { validateAddOrUpdateProductRequest} = require('../middlewares/validation.middleware/requestValidator');


router.post("/create", [validateAccessToken, validateAdmin, validateAddOrUpdateProductRequest], productController.createProduct);
router.post("/createMultipleProducts",[validateAccessToken, validateAdmin], productController.createMultipleProducts);
router.get("/productByName/:name", productController.fetchProductByName);
router.get("/productByCategoryId/:categoryId", productController.fetchProductsByCategoryId);
router.get("/fetchAllProducts", productController.fetchAllProducts);
router.get("/productById/:id", productController.fetchProductById);
router.get("/search", productController.search);

module.exports = router;         