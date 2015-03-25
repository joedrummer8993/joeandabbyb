/*
* Module dependencies
*/
var express = require('express')
	, stylus = require('stylus')
	, nib = require('nib')
	, morgan = require('morgan')
    , jeet = require('jeet')

var app = express()
function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
    .use(jeet())
}
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.set('port', (process.env.PORT || 5000));
app.use(morgan('combined'))
app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
))
app.use(express.static(__dirname + '/public'))
app.get('/', function (req, res) {
	res.render('index',
	{ title : 'Home' }
	)
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});