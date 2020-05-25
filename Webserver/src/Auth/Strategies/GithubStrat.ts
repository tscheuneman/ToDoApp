import GitHubStrategy from 'passport-github';
import UserService from '../../Services/UserService';

export default function GithubStrat() {
    return new GitHubStrategy.Strategy({
        clientID: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
        callbackURL: 'http://127.0.0.1:5000/login/github/callback'
    }, (token, refreshToken, profile, done) => {
        process.nextTick(async () => {
            try {
                const User = new UserService;
                const UserObj = {
                    thirdParty: true,
                    uniqueId: profile.id,
                    username: profile.username,
                }
                const ReturnUser = await User.findOrCreate(UserObj);
                return done(null, ReturnUser);
            } catch(err) {
                return done(err, false);
            }
        });
    });
}