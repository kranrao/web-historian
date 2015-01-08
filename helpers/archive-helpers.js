var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('http-request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  fs.readFile(exports.paths.list, 'utf8', function(err, data){
    var urlList = data.split('\n');
    callback(urlList);
  })
};

exports.isUrlInList = function(url){
  var urlList =   fs.readFileSync(exports.paths.list, 'utf8').split('\n');
  for(var i=0; i<urlList.length; i++){
    if(urlList[i]===url){
      return true;
    }
  }
  return false;
};

exports.addUrlToList = function(url){
  if(!exports.isUrlInList(url)){
    fs.appendFile(exports.paths.list, url + '\n', function(){
      //if something needs to be done after file is added
    });
  }
};

exports.isURLArchived = function(url){

  try{
    return fs.readFileSync(exports.paths.archivedSites + '/' + url, 'utf8');
  }
  catch(err){
    return false;
  }

};

exports.downloadUrls = function(url){
  request.get(url, function(err, res){
    if(err){
      console.log('error occured');
      return;
    }
    fs.writeFile(exports.paths.archivedSites + '/' + url, res.buffer.toString(), function(err, data){
      console.log('success');
    });

  });
};
