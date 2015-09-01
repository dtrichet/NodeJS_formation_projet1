// ----------------------------------------------------------------------------
// DEFINITION DES SCHEMA DE LA BASE (CATALOGUES & DOCUMENTS)
// ----------------------------------------------------------------------------
var mongoose = require('./db.js').mongoose;

var monsterSchema = mongoose.Schema({
    name: String,
    desc: String,
    level: Number
});

var Monster = mongoose.model('Monster', monsterSchema);

// Donne accès au modèle Monster
exports.Monster = Monster;