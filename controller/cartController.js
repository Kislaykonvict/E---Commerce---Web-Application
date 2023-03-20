const { UNIQUE_KEY_CONSTRAINT_VALIDATION_ERROR } = require("../constants/ErrorConstants");
const cartRepository = require('../dao/repository/cart.repository');
const { Product } = require("../dao/repository/product.repository");



const createCart = (req, res) => {
    const cart = {
        username : req.user.username,
        cost : req.body.cost
    }
    cartRepository.createCart(cart)
    .then(result => {
        res.status(201).send(result);
    }).catch(error => {
        if(error.name === UNIQUE_KEY_CONSTRAINT_VALIDATION_ERROR) {
            return res.status(409).send({
                message : `Cart already exists!`
            });
        }
    }).catch(error => {
        console.log(error.message);
        res.status(500).send({
            message : `Error occured while creating cart. Please try again after sometime!`
        });
    })
}

const updateCart = (req, res) => {
    const cartId = req.params.id;
    cartRepository.fetchCartById(cartId)
    .then(cart => {
        if(!cart) {
            return res.status(404).send({
                message : "Cart not found!"
            });
        }
        Product.findByPk(req.body.productId)
        .then(product => {
            if(!product) {
                return res.status(404).send({
                    message : "Product not found!"
                })
            }
            cart.addProduct(
                product.id,
                {
                    through : {
                        quantity : req.body.quantity
                    }
                }
            )
            .then(() => {
                cart.getProducts()
                .then(products => {
                    let cost = 0;
                    const selectedProducts = [];
                    for(let product of products) {
                        cost += product.price * product.cart_product.quantity;
                        selectedProducts.push({
                            id : product.id,
                            name : product.name,
                            quantity : product.cart_product.quantity,
                            price : product.price
                        });
                    }
                    cart.cost = cost;
                    cart.save()
                    .then(() => {
                        res.status(200).send({
                            id : cart.id,
                            selectedProducts,
                            cost
                        })
                    })
                })
            })
        })
    })
    .catch(error => {
        console.log(error.message);
        res.status(500).send({
            message : `Error occured in processing the request. Please try again after sometime !`
        })
    })
}

const removeProductInCart = (req, res) => {
    cartRepository.fetchCartById(req.params.id)
    .then(cart => {
        if(!cart) {
            return res.status(404).send({
                message : "Cart not found !"
            });
        }
        if(!req.body.productId) {
            cart.cost = 0;
            Promise.all([cart.setProducts([]), cart.save()])
            .then(() => {
                res.status(200).send({
                    id : cart.id,
                    selectedProducts : [],
                    cost : cart.cost
                });
            })
        }
        else {
            cart.removeProduct(req.body.productId)
            .then(() => {
                cart.getProducts()
                .then(products => {
                    let cost = 0;
                    const selectedProducts = [];
                    for(let product of products) {
                        cost += product.price * product.cart_product.quantity;
                        selectedProducts.push({
                            id : product.id,
                            name : product.name,
                            quantity : product.quantity,
                            price : product.price
                        });
                    }
                    cart.cost = cost
                    cart.save().then(() => {
                        res.status(200).send({
                            id : cart.id,
                            selectedProducts,
                            cost : cart.cost
                        })

                    })

                })
            })
            .catch((error) => {
                console.log(error.message);
                res.status(500).send({
                    message : "Error occured while processing your request. Please try again after some time !"
                })
            })
        }
    })
}

const getCart = (req, res) => {
    const cartId = req.params.id;
    cartRepository.fetchCartById(cartId)
    .then(cart => {
        if(!cart) {
            res.status(404).send({
                message : "Cart not found!"
            })
        }
        cart.getProducts()
        .then(products => {
            let selectedProducts = [];
            for(const product of products) {
                selectedProducts.push({
                    id : product.id,
                    name : product.name,
                    quantity : product.cart_product.quantity,
                    price : product.price
                })
            }
            res.status(200).send({
                id : cart.id,
                selectedProducts,
                cost : cart.cost
            })
        })
        .catch((error) => {
            res.status(500).send({
                message : "Error occured while processing your request. Please try again after some time !"
            })
        })
    })
}

module.exports = {
    createCart : createCart,
    updateCart : updateCart,
    removeProductInCart : removeProductInCart,
    getCart : getCart
}