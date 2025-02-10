const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization']; 
    const token = authHeader && authHeader.split(' ')[1]; 
    
    if(!token) return res.status(401).json({erorr: 'Acess denied'}); 

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) {
            res.status(403).json({error: 'Could not verify token'});
        }
        req.userId = user.userId;
    });
    next();
};

module.exports = verifyToken;