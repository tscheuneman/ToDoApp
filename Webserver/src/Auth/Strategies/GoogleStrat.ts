import GoogleStrategy from 'passport-google-oauth20';

export default function GoogleStrat() {
    return new GoogleStrategy.Strategy('google', {
        clientId: process.env.GoogleID,
        clientSecret: process.env.GoogleSecret,
        callbackURL: 'http://127.0.0.1/google-token'
    }, (token, refreshToken, profile, done) => {
        process.nextTick(() => {
            //DO Stuff
        });
    });
}