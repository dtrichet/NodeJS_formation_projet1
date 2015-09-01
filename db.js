// ----------------------------------------------------------------------------
// Accès aux données
// ----------------------------------------------------------------------------
// mongoose.connect('mongodb://frankenstein:zombi>@ds055762.mongolab.com:55762/monsters');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/monsters');

var db = mongoose.connection;
db.on('error', function(error) {
    console.log('WARNING ***** DB connection error *****');
    console.log('WARNING ***** ' + error);
    });
db.on('open', function() {
    console.log('INFOS ***** DB connection OK *****');
    });

// Donne accès au modèle Monster
exports.mongoose = mongoose;
