const mongoose = require('mongoose');
// const URI ='mongodb://localhost/crud';
const URI = 'mongodb://evelez6082:similaresoldofa@cluster0-mangooldb-shard-00-00-nebdl.gcp.mongodb.net:27017,cluster0-mangooldb-shard-00-01-nebdl.gcp.mongodb.net:27017,cluster0-mangooldb-shard-00-02-nebdl.gcp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-MangoolDB-shard-0&authSource=admin&retryWrites=true';

mongoose.connect(URI,{ useNewUrlParser: true })
 .then(db => console.log('DB esta conectado'))
 .catch(err => console.error(err));

module.exports = mongoose;