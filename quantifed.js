// Utilities.
var util = require('util');
var http = require('http');

// Load and initialize the Kinvey library.
var Kinvey = require('kinvey');
Kinvey.init({
  appKey: 'kid_PVsQQe1N25',
  appSecret: '06ef63992d9c4815bc5897a1af8a9736'
});

// Create the server.
var server = http.createServer();

// Set default headers we sent on every response.
var headers = function(body) {
  return {
    Connection: 'close',
    'Content-Length': body.length,
    'Content-Type': 'application/json',
    'Date': new Date().toString(),
    Server: 'bookshelf'
  };
};

// Listen for incoming request.
server.on('request', function(_, response) {
  // Define the error handler for this request.
  var errorHandler = function(error) {
    var body = JSON.stringify(error);

    // I’m a teapot!
    response.writeHead(418, headers(body));
    response.write(body);
    response.end();
  };

  // Fetch all rations.
	var query = new Kinvey.Query();
	//query.equal('ITEM', 'Snack Bread, Wheat');
	query.on('ITEM').equal('Snack Bread, Wheat');

  var bookCollection = new Kinvey.Collection('rations', { query: query });
  bookCollection.fetch({
    success: function(books) {
		// Merge result sets, and pass to response.
		var body = JSON.stringify({
		books: books
		});

		// Write response.
		response.writeHead(200, headers(body));
		response.write(body);
		response.end();
/*      // Now, fetch all genres.
		var genreCollection = new Kinvey.Collection('genres');
		genreCollection.fetch({
		success: function(genres) {
		// Merge result sets, and pass to response.
		var body = JSON.stringify({
		books: books,
		genres: genres
		});

		// Write response.
		response.writeHead(200, headers(body));
		response.write(body);
		response.end();
        },
        error: errorHandler
      });*/
    },
    error: errorHandler
  });

});

// Listen on http://localhost:1234
server.listen(1234);
util.puts('Server running at http://localhost:1234');