const express = require('express');
const app = express();
const serverConfig = require('./configs/server.config');
const { initializeTables } = require('./dao/repository/tableInitializers');
const { createRoutes } = require('./routes/parentRouter');
const bodyParser = require('body-parser');

app.get("/", (req, res) => {
    res.send({
        message : "Welcome to our E-Commerce Application Platform!"
    });
});
 
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.listen(serverConfig.PORT, serverConfig.HOST, () => {
    console.log(`Server is listing on ${serverConfig.HOST} : ${serverConfig.PORT}`)
});

// IIFE - immediately invoked function expression!
(() => {
    createRoutes(app);
    if(serverConfig.ENV === 'dev') {
        initializeTables(false)
    }
})();   