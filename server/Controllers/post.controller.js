const fs = require("fs");
const multer = require('multer');

function createPost(req) {

}

function modifyPost(req) {

}

function savePost(req) {

}

function saveImage(req, res) {
    console.log(req.body)
    console.log('dudu')
    console.log(res);

    let __dirname = '/home/georgem/UTH/FWTOZ'
    var file = __dirname + "/" + req.filename;
    fs.readFile(req.body.filename, function (err, data) {
        fs.writeFile(file, data, function (err) {
            if (err) {
                console.log(err);
            } else {
                response = {
                    message: 'File uploaded successfully',
                    filename: req.file.name
                };
            }
            console.log(response);
            res.end(JSON.stringify(response));
        });
    });

}

function verifyExistence(req, res){

}


module.exports = {
    createPost: createPost,
    modifyPost: modifyPost,
    savePost: savePost,
    saveImage: saveImage,
    verifyExistence: verifyExistence
};
