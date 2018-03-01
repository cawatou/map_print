const express = require( 'express' );
const http = require( 'http' );
const path = require( 'path' ); 
const nunjucks = require( 'nunjucks' );
const bodyParser = require( 'body-parser' );

const app = express();

global.__public = path.join(__dirname, '/public/');

app.set('view engine', 'html');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static( __public ));

nunjucks.configure('views', {
	autoescape: true,
	express: app,
	noCache: true,
	watch: true
});

const index = require( './routes/index' );

app.use('/', index);

const server = http.createServer( app );

server.listen(3000, function() {
    console.log('listening on *:3000');
});

module.exports = app;