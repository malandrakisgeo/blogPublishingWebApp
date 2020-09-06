const fs = require("fs");
const multer = require('multer');
const postModel = require('./../Models/post')
const db = require('./../Config/db.config')

function getPublicPost(req, res) {
    return postModel.findOne({postuuid: req.params.postuuid})
        .sort({'_id': -1}) //get most recent version
        .then(post => {
                console.log(post.published)
                if (post.published === true) {
                    res.status(200).json(post);
                } else {
                    res.status(400).json();
                }
            }
        );
}

function getPost(req, res) {
    if (req.params.userid != null && req.params.postuuid != null) {
        return postModel.findOne({postuuid: req.params.postuuid, userId: req.params.userid})
            .sort({'_id': -1}) //get most recent version
            .then(result => {
                res.status(200).json(result);
            });
    }
}

function getParticularVersion(req, res) {
    return postModel.findOne({postuuid: req.params.postuuid, userId: req.params.userid, version: req.params.version})
        .then(result => {
            res.status(200).json(result);
        });
}

function getVersions(req, res) {
    return postModel.findOne({postuuid: req.params.postuuid})
        .sort({'_id': -1}) //get most recent version
        .then(result => {
            res.status(200).json(result.version); //return its' number
        });
}

function deletePosts(req, res) {
    console.log(req);
    console.log(req.body);
    console.log(req.body.posts);
    let result;
    req.body.posts.forEach(post => {  ///DEN VAZOUME FUNCTION
            console.log(post);
            postModel.deleteMany({postuuid: post.postuuid}).then(console.log('ok'));
        }
    )
    res.status(200).json(result);

}


function postsOfUser(req, res) {
    let writings = [];
    postModel.find({userId: req.params.userid, version: '0'}) //All posts are supposed to have a version 0
        .sort({'_id': -1}) //Most recent first
        .select('title postuuid -_id')  //Get only title and postuuid
        .then(posts => //The find() function in mongoose returns a query, and not a Promise! Still, there is a then() function
            posts.forEach(writing => {
                writings.push(writing);
            })).then(() => {
            return res.status(200).json(writings);
        }
    );
}

function modifyPost(req) {

}

function savePost(req) {

}

//How to insert data in mongoose schema.
//The function below saves a new Post, both its' first time and after modifications
function verifyAndSave(req, res) {
    let userId = req.body.post.userId
    let item = new postModel(req.body.post);
    item.save();
    return new postModel({
        articleID: req.body.postuuid,
    });
}

function saveImage(req, res) {
    /*console.log(req.body)
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
*/
}


module.exports = {
    getPost: getPost,
    modifyPost: modifyPost,
    savePost: savePost,
    saveImage: saveImage,
    verifyAndSave: verifyAndSave,
    postsOfUser: postsOfUser,
    getVersions: getVersions,
    getParticularVersion: getParticularVersion,
    getPublicPost: getPublicPost,
    deletePosts: deletePosts,
};
