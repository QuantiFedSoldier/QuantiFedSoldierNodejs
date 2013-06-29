// Utilities.

// Load and initialize the Kinvey library.
var Kinvey = require('kinvey');
Kinvey.init({
  appKey: 'kid_PVsQQe1N25',
  appSecret: '06ef63992d9c4815bc5897a1af8a9736'
});



var
    //_                    = require('underscore'),
    express              = require('express'),
    app                  = express(),
    server               = require('http').createServer(app);

// -----------------------------------------------------------------------------
// Web Server Setup
// -----------------------------------------------------------------------------

// Add middleware to parse the POST data of the body
app.use(express.bodyParser());

// Start listening on port 8080
server.listen(8080);
console.log('Listening on port 8080');

// -----------------------------------------------------------------------------
// RESTful Service Setup
// -----------------------------------------------------------------------------


// ----- LabRequest -----
app.get('/rest/lab-requests', function (req, res) {
    'use strict';
	
	// Define the error handler for this request.
  var errorHandler = function(error) {
    var body = JSON.stringify(error);

    // I’m a teapot!
    res.setHeader('Content-Type', 'application/json');
	return res.send(body);
  };

  // Fetch all rations.
	var myQuery = new Kinvey.Query();
	myQuery.on('ITEMTYPE').equal('Snack'); //Intentionally doesn't match any results.  Shows query working.

  var rations = new Kinvey.Collection('rations');
  rations.setQuery(myQuery);
  rations.fetch({
    success: function(ration) {
/*		// Merge result sets, and pass to response.
		var body = JSON.stringify({
		ration: ration
		});

		// Write response.
		response.writeHead(200, headers(body));
		response.write(body);
		response.end();*/
		res.setHeader('Content-Type', 'application/json');
		return res.send(ration);
    },
    error: errorHandler
  });
});