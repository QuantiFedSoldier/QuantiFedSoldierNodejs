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
app.get('/rest/load-item-type', function (req, res) {
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
	myQuery.on('ITEMTYPE').equal(req.query.itemType);

	
    /*var myBirthdayParty = new Kinvey.Entity({}, 'rations');
    myBirthdayParty.load('51ce3607d9404fe00a0002ec', {
    success: function(ration) {
		res.setHeader('Content-Type', 'application/json');
		return res.send(ration.toJSON(true));
    },
    error: function(e) {
    // Failed to fetch birthday-party-id.
    // e holds information about the nature of the error.
    }
    });*/
	
  var rations = new Kinvey.Collection('rations');
  rations.setQuery(myQuery);
  rations.fetch({
    success: function(ration) {
		res.setHeader('Content-Type', 'application/json');
		return res.send(ration);
    },
    error: errorHandler
  });
});