import GitHubStrategy from 'passport-github';

export default function GithubStrat() {
    return new GitHubStrategy.Strategy('github', {
        clientId: process.env.GoogleID,
        clientSecret: process.env.GoogleSecret,
        callbackURL: 'http://127.0.0.1/login/github/callback'
    }, (token, refreshToken, profile, done) => {
        process.nextTick(() => {
            //DO Stuff
        });
    });
}