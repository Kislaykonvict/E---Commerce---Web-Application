exports.validateAddOrUpdateCategoryRequest = (req, res, next) => {
    if(!req.body) {
        res.status(400).send({message : `Request body cannot be empty!`});
        return;
    }
    if(!req.body.name) {
        res.status(400).send({message : `Category name cannot be empty!`});
        return;
    }
    next();
}

exports.validateAddOrUpdateProductRequest = (req, res, next) => {
    if(!req.body) {
        res.status(400).send({message : `Request body cannot be empty`});
        return;
    }
    if(!req.body.name) {
        res.status(400).send({message : `Product name cannot be empty!`});
        return;
    }
    
    
    if(!req.body.categoryId) {
        res.status(400).send({message : `CategoryId cannot be empty!`});
        return;
    }
    if(typeof req.body.categoryId !== 'number') {
        res.status(400).send({message : `Invalid CategoryId!`});
        return;
    }
    next();
}

exports.validateAddOrUpdateMultipleProductsRequest = (req, res, next) => {
    if(!req.body.products) {
        res.status(400).send({ message : `List of products cannot be empty!`});
        return;
    }
    for(let product of req.body.products) {
        if(!product.name || !product.categoryId) {

            res.status(400).send({message : `Name or CategoryId cannot be empty!`});
            return;
        }
    }
    next();
}