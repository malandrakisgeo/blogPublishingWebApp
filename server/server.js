//Configurations
const passportConfig = require('./Config/passport.config');
const dbConfig = require('./Config/db.config');
const corsOptions = {
    origin: 'http://localhost:4200'
}


//Required modules & important definitions
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const multer = require('multer');
const upload = multer({dest: '/home/georgem/UTH/FWTOZ'});
const router = express.Router();
const blogapp = express();
const url = require('url');

//App
//blogapp.use(cors(corsOptions)); //prepei na exei kai tis parentheseis!
blogapp.use(passport.initialize());
blogapp.use(passport.session());
blogapp.use(bodyParser.json()); // support json encoded bodies
blogapp.use(bodyParser.text()); // support json encoded bodies
blogapp.use(bodyParser.urlencoded({extended: true}));
blogapp.use(router);
/*blogapp.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    next();
});*/

blogapp.use(session({secret: "SecretSession for BlogPublishingWebApp"}));
blogapp.use(cors({origin: ["http://localhost:4200"], credentials: true}));
var allowedOrigins = ['http://localhost:4200'];
blogapp.use(cors({
    origin: function(origin, callback){    // allow requests with no origin
        // (like mobile apps or curl requests)
        if(!origin) return callback(null, true);
        if(allowedOrigins.indexOf(origin) === -1){
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }    return callback(null, true);
    }
}));


/*
blogapp.use(cookieParser());

blogapp.use(function (req, res, next) {
    var cookie = req.cookies.cookieName;
    if (cookie === undefined) {
        var randomNumber=Math.random().toString();
        randomNumber=randomNumber.substring(2,randomNumber.length);
        res.cookie('cookieName',randomNumber, { maxAge: 50000000, httpOnly: true });
        console.log('cookie created successfully');
    } else {
        console.log('cookie exists', cookie);
    }
    next();
});*/


//Models
const Writing = require('./Models/post');
const User = require('./Models/user');

//Controllers
const userController = require('./Controllers/user.auth.controller');
const postController = require('./Controllers/post.controller');


//Routes and request handling
blogapp.get('/auth/google',
    passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']}));

blogapp.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/loginfailed',
    }), (req, res) => {
        let user = userController.login(req);
        /*res.set({
            "prof": user.googleID,
            "nickName": user.nickName,
            "userToken": user.lastValidToken
        } );*/
        res.redirect(url.format({
            pathname: "http://localhost:4200/userPostPanel/",
            query: {
                "prof": user.googleID,
                "nickName": user.nickName,
                "userToken": user.lastValidToken
            }
        }));
    }
);

blogapp.get('/getpost/:postuuid/:userid',
    function (req, res) {
        return postController.getPost(req, res); //returns most recent version

    }
);

blogapp.get('/getpost/:postuuid/:userid/:version',
    function (req, res) {
        return postController.getParticularVersion(req, res);

    }
);

blogapp.get('/getPostsOfUser/:userid', (req, res) => {
    return postController.postsOfUser(req, res);
})

blogapp.get('/getposts',
    (req, res) => {
        postController.postsOfUser(req);
    }
);
blogapp.get('/getPublicPost/:postuuid',
    (req, res) => {
        postController.getPublicPost(req, res);
    }
);


blogapp.get('/getversions/:postuuid',
    (req, res) => {
        postController.getVersions(req, res);
    }
);

blogapp.post('/saveimg', (req, res) => {
    console.log(req)
    // postController.saveImage(req, res);
});

/*
Makes sure that the user really exists and is logged in.
Called everytime someone attempts to modify a post,
or even access the front-end page for modifying a post.
 */
blogapp.post('/genuineCreds', async (req, res) => {
    await userController.validRequest(req, res)
});

/*
The url for saving a post. The validRequest function
makes sure that no user modifies the post of another user,
or his own without being logged in. The controls of the
front-end should be sufficient, yet the backend should
always have its' own, independent security logic.
 */
blogapp.post('/verify', (req, res) => {
    if (userController.validRequest(req)) {
        postController.verifyAndSave(req, res);
    }
});
blogapp.put('/deletePosts', (req, res) => {
    if (userController.validRequest(req)) {
        postController.deletePosts(req, res);
    }
});


blogapp.listen(3000);
module.exports = blogapp;


/*
Writing.find({version: "1"}).then()(writings=>
    writings.forEach(writing => {
    console.log(writing.version);
}));




-------------------
const googleController = require('./Controllers/googlelogin.controller');

blogapp.get('/getGoogleUrl', () => {
        googleController.getURL
    }
);

blogapp.get('/gamothpanagiamoupia',
    (req, res) => {
        req.redirect('localhost:4200/userPostPanel');
    });
-----------------------


*/

/*
let finalResults = [];

let promises = Writing.find({version: "1"}, function (err, results) {
    results.forEach(function (element) {
        finalResults.push(element);
        console.log(element);
    });
});

Promise.all(promises).then(function () {
    console.log(finalResults);
}).error(console.error);

*/
