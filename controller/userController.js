const bcrypt = require('bcrypt');
const userRepository = require('../dao/repository/user.repository')
const { Op } = require("sequelize");
const authService = require('../externals/auth.service');
const { response } = require('express');

exports.registerUser = (req, res) => {
    //requestValidator
    encryptPassword(req.body.password)
    .then(hashedPassword => {
        req.body.password = hashedPassword;
        return userRepository.registerUser(req.body);
    }).then(result => res.status(201).send(result))
    .catch(error => {
        console.log(error);
        res.status(500)
        .send({
            message : 'Some error occured at the time of registration. Please try again after sometime!'
        })
    })
}

exports.login = (req, res) => {
    userRepository.fetchUserByCriteria({
        where : {
            [Op.or] : [{       
                username : req.body.username
            }]
        }
    }).then(async (user) => {
        const isValidUser = await authenticateUser(req.body.password, user.password);
        return isValidUser ? user : undefined
    }).then(user => {
        if(!user) {
            res.status(401).send(`Invalid username or password`);
            return;
        }
        return authService.getAuthToken({
            username : user.username,
            permission : user.permission
        })
    })
    .then(result => {
        //create the payload and call the auth-server
        //will return the acces token.
        console.log(`login Successful!`);
        res.status(200).send(result.data);
    })
    .catch(error => {
        console.log(error.message);
        res.status(500)
        .send({
            message : 'Some error occured at the time of login. Please try again after sometime!'
        })
    })
}

const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt() //number - cost of processing the data / work factor or load factor
    return await bcrypt.hash(password, salt); // it will directly know salt number and then it has to hash it.
}

const authenticateUser = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}


exports.logout = (req, res) => {
    if(!req.headers['authorization']) {
        return res.status(400).send({
            message : "Token is missing !"
        })
    }
    authService.deleteToken(req.headers['authorization'])
    .then(response => {
        if(response.status === 200) {
            res.status(200).send({
                message : "You are logged out successfully !"
            })
        }
        else if(response.status === 401) {
            res.status(401).send(response.data)
        }
    })
    .catch(error => {
        res.status(500).send(error.response.data)
    })
}