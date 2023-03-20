const { validateToken } = require("../../externals/auth.service");



exports.validateAccessToken = (req, res, next) => {
    //1.we have to authorize the user - call the auth server
    //2. we have to decode the access token
    //3. we have to add the user details in the req body.

    const authToken = req.headers['authorization'];
    validateToken(authToken)
    .then(result => {
        if(result.status == 200) {
            console.log(`user validated Successfully!`);
            //decode the token and add the details to the req.user = payload
            //req.user.username, req.user.permission.
            req.user = result.data;
            next();
        } else if(result.status == 401) {
            res.sendStatus(401);
        } else if(result.status == 403) {
            res.sendStatus(403);
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).send({
            message : `Unable to validate user. Please try again after sometime!`
        })
    })
}

exports.validateAdmin = (req, res, next) => {
    if(!(req.user && req.user.permission === 'ADMIN')) {
        console.log(req.user.permission);
        res.status(403).send({
            message : `User doesn't have the required permissions`
        })
        return;
    }
    next();   
}