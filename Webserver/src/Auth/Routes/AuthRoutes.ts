import express from "express";
import passport from 'passport';

const router = express.Router();

router.get('/github', passport.authenticate('github'));
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/error' }),
  (req, res) => {
    console.log('wut?');
    res.redirect('/');
});


module.exports = router;