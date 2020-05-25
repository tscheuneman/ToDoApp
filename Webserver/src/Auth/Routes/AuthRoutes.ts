import express from "express";
import passport from 'passport';

const router = express.Router();

router.get('/facebook', passport.authenticate('facebook'));
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/error' }),
  function(req, res){
    res.send('Logged In facebook.');
});

router.get('/google', passport.authenticate('google'));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res){
    res.send('Logged In google.');
});

router.get('/github', passport.authenticate('github'));
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/error' }),
  function(req, res){
    res.send('Logged In github.');
});


module.exports = router;