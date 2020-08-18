const dbcon = require('./../Config/db.config')
const usermodel = require('./../Models/user')
const jwt = require('jsonwebtoken');


function userLogIn(req) {
    let user;

    dbcon.blogdb.toString();
    googleId = req.user.id;
    tokenToUse = generateToken();

    user = userFromGoogleLogin(req);
    user.lastValidToken = tokenToUse
    console.log(tokenToUse);
    usermodel.findOneAndUpdate({googleID: googleId}, {lastValidToken: tokenToUse},
        function (err, results) {
            if (err) {
                return err;
            }
            if (results) {
                console.log('updated!');
            } else {
                createIfNotExists(user);
            }
        });
    return user;
};

function userFromGoogleLogin(req) {
    let user = usermodel();
    user.googleID = req.user.id;
    user.nickName = req.user.displayName;
    user.email = req.user.emails[0].value;
    return user;

}

function createIfNotExists(user) {
    user.save();
}


function userLogOut(googleId) {

};


//Makes sure that no one modifies the post of another user,
// or any post without being logged in.
async function validRequest(req, res) {
    let schemaResponse ;

    try {
        await usermodel.findOne({googleID: req.body.user.userId, lastValidToken: req.body.user.token},
            function (err, results) {
                if (err) {
                    schemaResponse = false;
                }
                if (results) {
                    schemaResponse = true;
                } else {
                    schemaResponse = false;
                }
            }).exec().then(() => {
            res.send( schemaResponse);
        });
    } catch {
        return false;
    }
};

function generateToken() {
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60) //Expires in an hour.
    }, "BlogPublishingWebService"); // DO NOT KEEP YOUR SECRET IN THE CODE!
}


module.exports = {
    login: userLogIn,
    logout: userLogOut(),
    validRequest:  validRequest,
    generateToken: generateToken

};
