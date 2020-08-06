/*
to parakatw emfanizei ta collectionnames:
mongoose.connect('mongodb://GeoAdmin:!QAZxsw2@localhost:27017/writingsdb', function(err, client) {
    if(err) {
        console.log(err)
    }
    client.db.listCollections().toArray(function(err, collections) {
        console.log(collections);
    });
});




to parakatw dienergei query:

const db = mongoose.connect('mongodb://GeoAdmin:!QAZxsw2@localhost:27017/writingsdb', {useNewUrlParser: true});
let finalResults = [];

let promises = Writing.find({version: "1"}, function(err, results) {
    results.forEach(function(element) {
        finalResults.push(element);
        console.log(element);
    });
});

Promise.all(promises).then(function() {
    console.log(finalResults);
}).error(console.error);














 */
