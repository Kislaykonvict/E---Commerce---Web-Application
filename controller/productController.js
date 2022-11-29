const productRepository = require("../dao/repository/product.repository");
const errorConstants = require("../constants/ErrorConstants")
const { Op, where } = require("sequelize");

const createProduct = (req, res) => {
    //1. name should not be null
    //2. categoryId should not be null
    const body = req.body;

    productRepository.createProduct({
        name : body.name,
        description : body.description,
        imageUrl : body.imageUrl,
        price : body.price,
        categoryId : body.categoryId
    }).then(result => {
        console.log(`Product : ${body.name} has been created successfully!`)
        res.status(201).send(result)
    }).catch(error => {
        //1. Duplicate name
        if(error.name === errorConstants.UNIQUE_KEY_CONSTRAINT_VALIDATION_ERROR) {
            res.status(400)
            .send({
                message : `Product name :${body.name} already exists in the System!`
            });
            return;
        }
        throw error;
        //2. invalid categoryId
    }).catch(error => {
        if(error.name = errorConstants.FOREIGN_KEY_CONSTRAINT_VALIDATION_ERROR) {
            console.log(`Invalid categoryId : ${body.categoryId}`);
            res.status(400)
            .send({
                message : "Category Id doesn't exist in the System!"
            });
            return;
        }
        throw error;
    }).catch(error => {
        console.log(`Saving ${body.name} to database failed with error ${error.message}`);
        res.status(500).send({
            message : `Unable to save product ${body.name} to DB. Please try again after sometime!`
        })
    })

}
//Creating/adding multiple products at once.
const createMultipleProducts = (req, res) => {
    const products = req.body.products;
    const validProducts = new Array();
    for(let product of products) {
        if(!product.name || !product.categoryId) {
            res.status(400).send({
                message : `Name or CategoryId cannot be empty!`
            })
            return;
        }
        validProducts.push({
            name : product.name,
            description : product.description,
            imageUrl : product.imageUrl,
            price : product.price,
            categoryId : product.categoryId
        });
    }

    productRepository.createMultipleProducts(validProducts)
    .then(result => {
        console.log(`Multiple products have been created successfully!`)
        res.status(201).send(result)
    }).catch(error => {
        console.log(error.message)
        res.status(500).send({
            message : `Error in creating multiple products. Please try again after sometimes.`
        })
    })
}

const fetchAllProducts = (req, res) => {
    productRepository.fetchAllProducts()
    .then(result => {
        console.log("List of all products sent successfully!")
        res.status(200).send(result)
    })
    .catch(error => {
        console.log(`Error in fetching all the products ${error.message}`)
        res.status(500).send({
            message : `Error occured in processing the request, Please try again after sometime!`
        })
    })
}


// 1. fetch product by Name
const fetchProductByName = (req, res) => {
    productRepository.fetchProductsByCriteria({
        where : {
            name : req.params.name
        }
    }).then(result => res.status(200).send(result))
    .catch(error => {
        console.log(error.message);
        res.status(500).send({
            message : `Error occured in processing the request, Please try after sometime`
        });
    })
}

const fetchProductById = (req, res) => {
    const id = parseInt(req.params.id);
    productRepository.fetchProductById(id)
    .then(result => {
        if(!result) {
            res.status(404).send({message : `productId : ${id} not present`});
            return;
        }
        res.status(200).send(result)
    })
    .catch(error => {
        console.log(error.message);
        res.status(500).send({
            message : `Error occured in processing the request, Please try after sometime!`
        })
    })
}

//2. fetch products by category id
// const fetchProductsBycategoryId = (req, res) => {
//     productRepository.fetchProductsByCriteria({
//         where : {
//             categoryId : req.params.categoryId
//         }
//     }).then(result => res.status(200).send(result))
//     .catch(error => {
//         //con
//         res.status(500).send({
//             message : `Error occured in processing the request, Please try after sometime!`
//         });
//     })
// }



const fetchProductsByCategoryId = (req, res) => {

    let criteria;
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;
    if(minPrice && maxPrice) {
        criteria = {
            where: {
                [Op.and]: [
                    {
                        categoryId : req.params.categoryId
                    },
                    {
                        price : {
                            // [Op.gte] : minPrice, //Greater than equal to
                            // [Op.lte] : maxPrice //Less than equal to
                            [Op.between] : [minPrice, maxPrice] //between the range.
                        }
                    }
                ]
            },
            order : [['price', 'ASC']]
        }
    }
    else {
        criteria = {
            where : {
                categoryId : req.params.categoryId
            }
        }
    }
    productRepository.fetchProductsByCriteria(criteria)
    .then(result => res.status(200).send(result))
    .catch(error => {
        console.log(error.message);
        res.status(500).send({
            message : `Error occured in processing the request, Please try after sometime!`
        });
    })
}

const search = (req, res) => {
    const keyword = req.query.search;
    const keywords = keyword.split(' ');
    const likeKeywords = [];
    const criteria = {};
    for(let i = 0; i < keywords.length; i++) {
        likeKeywords[i] = {
            name : {
                [Op.like] : `%${keywords[i]}%`
            }
        }
    }
    criteria.where = {
        [Op.and] : likeKeywords
    }
    console.log(criteria);   

    productRepository.fetchProductsByCriteria(criteria)
    .then(result => res.status(200).send(result))
    .catch(error => {
        console.log(error);
        res.status(500).send({
            message : `Error occured in processing the request, Please try after sometime!`
        });
    })
}

module.exports = {
    createProduct : createProduct,
    createMultipleProducts : createMultipleProducts,
    fetchProductByName : fetchProductByName,
    fetchProductsByCategoryId : fetchProductsByCategoryId,
    fetchAllProducts : fetchAllProducts,
    fetchProductById : fetchProductById,
    search : search
}