const GOOGLE_CLIENT_ID = "541694063522-hviuvatfksluu2omm9tsg6senh5lgg30.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "OJwiNpA5-likC6WuXjP-lbCl";

global.passport = require('passport');
global.GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback",
        passReqToCallback: true
    },
    function (req, accessToken, refreshToken, profile, done) {
        console.log(profile.id);
        if (profile) {
            return done(null, profile);
        } else {
            return done(null, null);
        }
    }
));




