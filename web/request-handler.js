var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var fs = require('fs');
// require more modules/folders here!

// router object - refactor in future so that code is dryer (review previous solution)
var actions = {
  GET: function(req, res){

    res.writeHead(200, httpHelpers.headers);
    // In future use url parse to do this correctly
    if (req.url === '/'){
      fs.readFile(archive.paths.siteAssets + '/index.html', function(err, data){
        res.end(data.toString());
      });
    } else {
      fs.readFile(archive.paths.archivedSites + req.url, function(err, data){
        res.end(data.toString());
      });
    }
  },
  POST: function(req, res){

  },
  OPTIONS: function(req, res){

  }
};

exports.handleRequest = function (req, res) {

  var action = actions[req.method];
  if (action) {
    action(req, res);
  }
};
