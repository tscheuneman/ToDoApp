import FacebookStrategy from 'passport-facebook';

export default function FacebookStrat() {
    return new FacebookStrategy.Strategy('facebook', {
        clientId: process.env.FacebookID,
        clientSecret: process.env.FacebookSecret,
        callbackURL: 'http://127.0.0.1/facebook-token'
    }, (token, refreshToken, profile, done) => {
        process.nextTick(() => {
            //DO Stuff
        });
    });
}