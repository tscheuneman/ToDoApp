import express from "express";
import passport from 'passport';

const router = express.Router();

router.get('/facebook-login', passport.authenticate('facebook'));
router.get('/facebook-token', passport.authenticate('facebook', { failureRedirect: '/error' }),
  function(req, res){
    res.send('Logged In facebook.');
});

router.get('/google-login', passport.authenticate('google'));
router.get('/google-token', passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res){
    res.send('Logged In google.');
});

router.get('/github-login', passport.authenticate('github'));
router.get('/github-token', passport.authenticate('github', { failureRedirect: '/error' }),
  function(req, res){
    res.send('Logged In github.');
});


module.exports = router;