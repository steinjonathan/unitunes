var express = require('express');
var exphbs  = require('express-handlebars');
var multer = require('multer'),
	bodyParser = require('body-parser'),
	path = require('path'),
	cors = require('cors');

var app = new express();
app.use(cors());
app.use(bodyParser.json());

// view engine setup
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function(req, res){
  res.render('index');
});

app.post('/', multer({ dest: './uploads/'}).single('upl'), function(req,res){
	console.log(req.body); //form fields
	console.log(req.file); //form files
	// console.log(req);
	res.status(201).send({
    path: req.file.path,
    originalName: req.file.originalname
  });
});

var server = app.listen(3030, function() {
    console.log('Listening on port %d', server.address().port);
});
