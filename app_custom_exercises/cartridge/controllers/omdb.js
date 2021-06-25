var server = require('server');
var service = require('*/cartridge/controllers/omdbService');
var Logger = require('dw/system/Logger');
var omdbForm = server.forms.getForm('omdb');

server.get('Start', function (req, res, next) {
    
    var properties = {};
    var template = 'OMDBITemp';
   
   // var SearchItem = document.getElementById('search').value();
    //Logger.warn(SearchItem);
    var url = service.omdbapiJSON.getURL();
    Logger.warn('url '+url);
    var posturl = '?i=tt3896198&apikey=567440b2';
    service.omdbapiJSON.setURL(url+posturl);
    var svcResult = service.omdbapiJSON.call();

     
    properties.data = svcResult.object;
    if (svcResult.status === 'OK') {

        Logger.warn('svcResult1' +svcResult);
    }

    else{
       Logger.warn('errorrrr');
    }

   
    res.render(template, properties)

    next();
});




module.exports = server.exports();



