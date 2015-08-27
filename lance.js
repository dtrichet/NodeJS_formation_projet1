// ----------------------------------------------------------------------------
// // GESTION DES TEMPLATES ET DES VUES
// ----------------------------------------------------------------------------
var express = require('express');
var app = express();
var bodyParser  = require('body-parser');
var mongoose = require('mongoose');
var count = 0;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.set('view engine', 'jade');
// ----------------------------------------------------------------------------
// Accès aux données
// ----------------------------------------------------------------------------
// mongoose.connect('mongodb://frankenstein:zombi>@ds055762.mongolab.com:55762/monsters');
mongoose.connect('mongodb://localhost/monsters');
var db = mongoose.connection;
db.on('error', function(error) {
    console.log('WARNING ***** DB connection error *****');
    console.log('WARNING ***** ' + error);
    });
db.on('open', function() {
    console.log('INFOS ***** DB connection OK *****');
    });

var monsterSchema = mongoose.Schema({
    name: String,
    desc: String,
    level: Number
});
var Monster = mongoose.model('Monster', monsterSchema);

/*
var monsters = [
	{name: 'Riri', level:3, desc: 'le petit cochon qui rit'},
	{name: 'Fifi', level:2, desc: 'le vampire qui rend pire'},
	{name: 'Loulou', level:6, desc: 'le loup garou qui fait des trous'}
];
*/

// ----------------------------------------------------------------------------
// Gestion des URL
// ----------------------------------------------------------------------------
// 
// Gestion URL de base du site
app.get('/home', function (req, res) {
	res.render('home.jade');
});

// Gestion URL de base du site
app.get('/monsters', function (req, res) {
    Monster.find(function(err, monsters) {
        if (err) {
            console.log(err);
        } else {
            res.render('monsters_list.jade', {monsters: monsters});
        }
    });
});

// Gestion URL nouveau monstre
app.get('/new_monster', function (req, res) {
	res.render('new_monster.jade');
});

// Gestion des monstres URL /monsters/id
app.get('/monster/:id', function (req, res) {
    Monster.findById(req.params.id, function(err, monster) {
        if (err) {
            console.log(err);
        } else {
            res.render('monster.jade', {monster: monster});
        }
    });
});

// Creation des monstres Methode POST dans le formulaire req.body
app.post('/create_monster', function (req, res){
    var monster = new Monster({
	name: req.body.name,
	desc: req.body.desc,
	level: parseInt(req.body.level, 10)
    });
    monster.save(function (err, monster) {
        if (err) {
            console.log("Can't save Monster " + err);
        } else {
            res.render('monster_created.jade');
        }
    });
});
// ----------------------------------------------------------------------------
// SERVEUR WEB
// ----------------------------------------------------------------------------
var server = app.listen(8888, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
});
