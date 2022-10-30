const express = require('express');
const app = express();
const serverConfig = require('./configs/server.config');
const { initializeTables } = require('./dao/repository/tableInitializers');
const { createRoutes } = require('./routes/parentRouter');
const bodyParser = require('body-parser');

//bodyparser - inorder to be able to parse any json to an object when we are using the request body
//To be simple, querystring cannot parse nested object. Instead, it will be presented in [] format. 
//While qs can be parsed in nested object -----> extended : true
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send({
        message : "Welcome to our E-Commerce Application Platform!"
    });
});

app.listen(serverConfig.PORT, serverConfig.HOST, () => {
    console.log(`Server is listing on ${serverConfig.HOST} : ${serverConfig.PORT}`)
});

// IIFE - immediately invoked function expression! cz we need to invoke this feature exactly once everytime at the start of this application
(() => {
    //1. configure the routers
    createRoutes(app);
    //2. Initialize the databases if environment is development
    if(serverConfig.ENV === 'dev') {
        initializeTables(false)
    }
})();   