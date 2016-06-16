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

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/assets/images')
  },
  filename: function (req, file, cb) {
		var mime = require('mime');
		var crypto = require('crypto');
    crypto.pseudoRandomBytes(16, function (err, raw) {
			console.log(file.mimetype);
			console.log(mime.extension(file.mimetype));
			var extension = mime.extension(file.mimetype);
			if(file.mimetype === 'audio/mp3') {
				extension = 'mp3';
			}
      cb(null, raw.toString('hex') + Date.now() + '.' + extension);
    });
  }
});
var upload = multer({ storage: storage });

app.post('/', upload.single('upl'), function(req,res){
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
