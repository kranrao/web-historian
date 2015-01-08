// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.

var archive = require('../helpers/archive-helpers');

var downloadMissingUrls = function(){
  archive.readListOfUrls(function(urlList){
    for(var i=0; i<urlList.length; i++){
      if(!archive.isURLArchived(urlList[i])){
        archive.downloadUrls(urlList[i])
      }
    }
  });
};

downloadMissingUrls();

// cron instructions
// create new cron: crontab -e
// cron job (run every minute): */1 * * * *  /Users/student/.nvm/v0.10.26/bin/node /Users/student/Desktop/2014-12-web-historian/workers/htmlfetcher.js
