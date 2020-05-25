export default function IsAuth(req, res, next) {
    if(req.user !== undefined) {
        next();
    } else {
        res.redirect('/login');
    }
}