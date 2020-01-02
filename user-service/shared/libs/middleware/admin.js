const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


module.exports =  (req, res, next) => {
    // check the request has Authorization header
    const authHeader = req.get('Authorization');
    if(!authHeader){
        req.isAuth = false; // set user has not authenticated
        res.status(401).json({message: 'Unauthorized'})
    }

    // check if the jwt token is pass
    const token = authHeader.split(' ')[1]; // Authorization: Bearer <access_token>

    if(!token || token == ''){
        res.status(401).json({ message: 'Unauthorized' });
    }
    let decodedData;

    try {
       decodedData = jwt.verify(token, process.env.SECRET_KEY)
    }catch(err){
        res.status(401).json({ message: 'Unauthorized' });
    }
    if(!decodedData){
        res.status(401).json({message: 'Unauthorized'})
    }
    if (decodedData.admin === false) {
        res.status(403).json({message: 'Forbidden'})
    }

    req.isAuth = true;
    req.admin = decodedData.admin;
    req.userId = decodedData.userId
    next();
}