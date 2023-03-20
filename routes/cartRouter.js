const express = require('express');
const { createCart, updateCart, removeProductInCart, getCart } = require('../controller/cartController');
const { validateAccessToken } = require('../middlewares/auth.middlewares/authorization.middleware');
const router = express.Router();

router.post('/create', [validateAccessToken], createCart);
router.put('/update/:id', [validateAccessToken], updateCart);
router.delete('/delete/:id', [validateAccessToken], removeProductInCart);
router.get('/:id', [validateAccessToken], getCart);

module.exports = router;