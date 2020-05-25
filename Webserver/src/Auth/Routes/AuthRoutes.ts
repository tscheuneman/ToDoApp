import express from "express";
import passport from 'passport';

const router = express.Router();

router.get('/github', passport.authenticate('github'));
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/error' }),
  function(req, res){
    res.send('Logged In github.');
});


module.exports = router;