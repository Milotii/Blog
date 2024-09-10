const jwt = require ('jsonwebtoken');

module.exports = (req, res, next) => {
    const AuthHeader = req.get('Authorization');
    if(!AuthHeader) {
        const error = new Error ('Not authenticated');
        error.statusCode = 401;
        throw error;
    }
    const token = req.get('Authorization').split(' ')[1];  //to get the token not bearer
    let decodedToken;
    try{
        decodedToken = jwt.verify(token, 'somesupersecretsecret');
    }
    catch(err) {
        err.statusCode = 500;
        throw err;
    }
    if (!decodedToken) {
        const error = new Error ('Not authenticated');
        error.statusCode = 401;
        throw error;
    }
    req.userId = decodedToken.userId;
    next();
};