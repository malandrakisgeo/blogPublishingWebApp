const dbcon = require('./../Config/db.config')
const usermodel = require('./../Models/user')

let user;



function userLogIn(googleId) {
    dbcon.blogdb.toString();

    usermodel.findOne({googleID: googleId}, function (err, results) {
        if(err){
            return err;
        }
        if(results){
        results.forEach(function (element) {
            this.user = element;
            console.log(element);
        });}
        else{
            createIfNotExists(googleId);
        };
    })
};

function createIfNotExists(googleId){
    console.log('running');
}



function userLogOut(googleId) {

};




module.exports = {
    login: userLogIn,
    logout: userLogOut()

};
