//Configurations
const passportConfig = require('./Config/passport.config');
const dbConfig = require('./Config/db.config');
const corsOptions = {
    origin: 'http://localhost:4200'
}

//App
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const router = express.Router();
const blogapp = express();
blogapp.use(cors(corsOptions)); //prepei na exei kai tis parentheseis!
blogapp.use(passport.initialize());
blogapp.use(passport.session());
blogapp.use(bodyParser.json()); // support json encoded bodies
blogapp.use(bodyParser.text()); // support json encoded bodies
blogapp.use(bodyParser.urlencoded({extended: true}));
//const multipart = require('connect-multiparty');
//const multipartMiddleware = multipart();
const multer = require('multer');
const upload = multer({dest: '/home/georgem/UTH/FWTOZ'});

blogapp.use(router);

//Models
const Writing = require('./Models/writing');
const User = require('./Models/user');

//Controllers
const userController = require('./Controllers/user.auth.controller');
const postController = require('./Controllers/post.controller');


/*blogapp.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", "True");
    next();

});*/


blogapp.get('/auth/google',
    passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']}));

blogapp.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/loginfailed'
    }), (req, res) => {
//        console.log(req.user);
        let n = userController.login(req.user.id);

        res.set({
            'userId': req.user.id,
            'displayName': req.user.displayName,
        });
        res.redirect('http://localhost:4200/userPostPanel/?prof:' + req.user.id);
    }
);

blogapp.get('/loginsuccessful',
    (req, res) => {
    }
);

blogapp.get('/createPost',
);

blogapp.get('/modifyPost',
);

/*blogapp.post('/saveimg',  (req,  res) => {
    console.log(req.body.length + 'dsdsdsd')
        postController.saveImage(req, res);
});*/

blogapp.post('/saveimg', (req, res) => {
    console.log(req)
   // postController.saveImage(req, res);
});

blogapp.get('/verify', (req, res) => {
    postController.verifyExistence(req, res);
});





//, upload.single("file"),

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

