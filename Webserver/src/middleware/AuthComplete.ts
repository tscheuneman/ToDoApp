import jwt from 'jsonwebtoken';

export default function IsAuth(req, res, next) {
    if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        const jwToken = req.headers.authorization.split(' ')[1];
        const token = jwt.verify(jwToken, process.env.JWT_SECRET);
        req.user = token;
        next();
    } else {
        res.send({success: false});
    }
}