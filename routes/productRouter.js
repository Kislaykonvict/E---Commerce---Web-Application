const express = require('express');
const router = express.Router();
const productController = require("../controller/productController");
const { validateAddOrUpdateProductRequest,  validateAddOrUpdateMultipleProductsRequest, validProductRequest} = require('../requestValidator/requestValidator');


router.post("/create", validateAddOrUpdateProductRequest, productController.createProduct);
router.post("/createMultipleProducts", validateAddOrUpdateMultipleProductsRequest,  productController.createMultipleProducts);
router.get("/productByName/:name", productController.fetchProductByName);
router.get("/productByCategoryId/:categoryId", productController.fetchProductsByCategoryId);
router.get("/fetchAllProducts", productController.fetchAllProducts);
router.get("/productById/:id", productController.fetchProductById);
router.get("/search", productController.search);

module.exports = router;   