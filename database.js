const mongoose = require('mongoose');
const URI ='mongodb://localhost/crud';

mongoose.connect(URI,{ useNewUrlParser: true })
 .then(db => console.log('DB esta conectado'))
 .catch(err => console.error(err));

module.exports = mongoose;