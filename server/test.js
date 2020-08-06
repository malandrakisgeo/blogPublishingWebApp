


/*
const express = require('express');
const cors = require('cors');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const GOOGLE_CLIENT_ID = "541694063522-9cbtsa7pe08dqchgq060m0r2ib5c75ro.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "G1RL5P-WJQUcnrKwj-jQJeSG";

const blogapp = express();
const passport = require('passport');

blogapp.use(passport.initialize());
blogapp.use(passport.session());
blogapp.use(cors()); //prepei na exei kai tis parentheseis!


passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback",
        passReqToCallback   : true,
        scope: ['profile', 'email'] //GAMW TO XRISTO KAI TH PANAGIA, MIA MERA PONOKEFALIASMA EPEIDH TO ALLO OUTE POU TO DIAVAZE KAN!!!!!!!!!!!!!!!!1
    },
    function (accessToken, refreshToken, profile, done) {
        console.log("access token: ", accessToken),
            function (err, user) {
                return done(err, user);
            }
    }
));

blogapp.get('/auth/google',
    passport.authenticate('google', { scope: [ 'profile', 'email' ] })
);

blogapp.get("/auth/google/callback",
    (req, res)=>{
        console.log('fdfd');
        req.redirect('localhost:4200');
    });

*/


//blogapp.use(express.static('public'));


// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.

/*blogapp.get('/auth/google/callback',
    passport.authenticate('google',
        {failureRedirect: '/', successRedirect: 'localhost:4200'});
    console.log("fdfd");
);*/



blogapp.get('/indexx', () => {
    console.log("fdd");
});


blogapp.listen(3000);


/*
npm install mongoose
npm install express
npm install --save-dev @types/express
npm install cors
---npm install -g bower
cd public
---bower install angular
ng new blogservice
ng generate component indexpage
npm install passport
npm install passport-google-oauth






Se provlhmata me updates! Ta trexoume kai sto BlogPublishingWebService, kai sto blogservice!
npm i @types/node@latest
npm update --save/--save-dev -f
npm cache clear --force
npm install typescript --save-dev
npm install @types/node --save-dev
    npm install typescript@'>=2.4.2 <2.7.0'
ng update @angular/cli@^9 @angular/core@^9 //DAM DAM DAAAAAAM


epeidh h teleutaia entolh den ektelesthh omalws, sto frontend/blogservice:
npm i -g npm-check-updates
ncu -u
npm install
ng update @angular/cli @angular/core --allow-dirty
ng update @angular/cli --from=1.7.4 --migrate-only --allow-dirty //POLU SHMANTIKO
 */

