
const categoryRepository = require("../dao/repository/category.repository");
const errorConstants = require("../constants/ErrorConstants")
const addCategory = (req, res) => {
    const body = req.body;

    if(!body.name) {
        res.status(404).send({
            message : "Category name cannot be empty"
        });
        return
    }
    categoryRepository.addCategory({
        name : body.name,
        description : body.description
    }).then((result) => {
        console.log(`Category name : ${body.name} has been created successfully!`);
        res.status(201).send(result);
    }).catch(error => {
        if(error.name === 'SequelizeUniqueConstraintError') {
            console.log(error.errors[0]);
            res.status(400).send({
                message : `${body.name} already exists!`
            });
            return;
        }
        throw error;
    })
    .catch(error => {
        console.log(`Error in creating category ${body.name}. Error message : ${error.message}`);
        res.status(500).send({
            message : "Error in creating category, Please try again after sometime"
        })
    })
}

const fetchAllCategories = (req, res) => {
    categoryRepository.fetchAllCategories()
    .then(categories => {
        res.status(200).send(categories);
    }).catch(error => {
        console.log(error.message);
        res.status(500).send("Error in loading all categories, Please try again sometime!")
    })
}

const fetchCategoryByID = (req, res) => {
    const categoryId = req.params.categoryId;
    categoryRepository.fetchCategoryByID(categoryId)
    .then(result => {
        if(!result) {
            throw new Error(errorConstants.MISSING_CATEGORY);
            // res.status(404).send({
            //     message : "The requested Categeory Id doesn't exist in the System!"
            // });
            // return;
        }
        res.status(200).send(result);
    })
    .catch(error => {
        if(error.message === errorConstants.MISSING_CATEGORY) {
            res.status(404).send({
                message : "The requested Categeory Id doesn't exist in the System!"
            })
        }
    })
    .catch(error => {
        console.log(error.message);
        res.status(500).send("Error in loading the category by Id, Please try after sometime!")
    })
}

const fetchCategoryByName = (req, res) => {
    categoryRepository.fetchCategoriesByCriteria({
        where : {
            name : req.params.name
        }
    })
    .then(result => {
        res.status(200).send(result)
    })
    .catch(error => {
        res.status(500).send({
            message : "Error occured in proccessing your request. please try again after sometime!"
        })
    })
}
module.exports = {
    create : addCategory,
    fetchAllCategories : fetchAllCategories,
    fetchCategoryByID : fetchCategoryByID,
    fetchCategoryByName : fetchCategoryByName
}