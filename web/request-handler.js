var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if (req.method === 'GET'){
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
  }
  /*res.end();*/
};
