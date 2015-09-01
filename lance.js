// ----------------------------------------------------------------------------
// // GESTION DES TEMPLATES ET DES VUES
// ----------------------------------------------------------------------------

// CONNEXION BASE MongoDB
var Monster = require('./db_schema.js').Monster;

// INCLUDE Express
var app = require('./express_app.js').app;

// ----------------------------------------------------------------------------
// Gestion des URL
// ----------------------------------------------------------------------------
// 
// Gestion URL de base du site
app.get('/', function (req, res) {
	res.render('home.jade');
});

// Gestion URL spécifique du site
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
	console.log('App listening at http://%s:%s', host, port);
});
