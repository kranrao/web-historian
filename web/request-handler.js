var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var fs = require('fs');
// require more modules/folders here!

// router object - refactor in future so that code is dryer (review previous solution)
var actions = {
  GET: function(req, res){
    console.log(req.url);

    // In future use url parse to do this correctly
    if (req.url === '/'){
      fs.readFile(archive.paths.siteAssets + '/index.html', function(err, data){
        res.writeHead(200, httpHelpers.headers);
        res.end(data.toString());
      });
    } else if (req.url === '/styles.css') {
      fs.readFile(archive.paths.siteAssets + '/styles.css', function(err, data){
        // not sending all headers, just content-type
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.end(data.toString());
      });
    } else {
      fs.readFile(archive.paths.archivedSites + req.url, function(err, data){
        if (err){
          res.writeHead(404, httpHelpers.headers);
          res.end();
        } else {
          res.writeHead(200, httpHelpers.headers);
          res.end(data.toString());
        }
      });
    }
  },
  POST: function(req, res){
    console.log(req.url);
    var data = '';
    // on data, chunk post url
    req.on('data', function(chunk){
      data += chunk;
    });

    // on end, write that data onto sites.txt and add '\n
    req.on('end', function(){
      fs.writeFile(archive.paths.list, data.split('=')[1] + '\n', function(){
        // after all is done, send response 302 to client
        res.writeHead(302, httpHelpers.headers);
        res.end();
      });
    });

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
