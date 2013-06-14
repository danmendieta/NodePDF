
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , PDFDoc = require('pdfkit')


var app = express();

// all environments
app.set('port', process.env.PORT || 4500);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

app.get('/users', user.list);

app.get('/getPDF', function (req, res){
  var doc = new PDFDoc();
  doc.text("Hola Mundo! ",50,50)
  doc.addPage()
    .fillColor("blue")
    .text('Here is a link!', 100, 100)
    .underline(100, 100, 160, 27, {color:"#2A60FF"})
   .link(100, 100, 160, 27, 'http://google.com/')
  doc.addPage().text('Rendering some SVG paths...', 100, 100).translate(220, 300)

  		//res.end(pdf, 'binary')
doc.write('salida.pdf');

doc.output(function(pdf){
	res.send(new Buffer(pdf, 'binary'));
});
 

})

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});




