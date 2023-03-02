const jwt = require('jsonwebtoken')

const validateToken = (req,res,next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.status(401).json({
            status:false,
            message:'Token missing.'
        });
    }
    jwt.verify(token,process.env.SECRET,(err,payload) => {
        if(err) 
            return res.status(401).json({
                status:false,
                message:'Token missing.'
            });
        req.payload = payload;
        next();
    });
}

module.exports = {validateToken}