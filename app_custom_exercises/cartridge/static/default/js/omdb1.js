'use strict';
var service = require('dw/svc/Service');
importPackage(dw.svc.Service);
var Logger = require('dw/system/Logger');
var datac= "";
Logger.warn('Heloooo');
// var searchResult={"Title":"Guardians of the Galaxy Vol. 2","Year":"2017","Rated":"PG-13","Released":"05 May 2017","Runtime":"136 min","Genre":"Action, Adventure, Comedy, Sci-Fi","Director":"James Gunn","Writer":"James Gunn, Dan Abnett (based on the Marvel comics by), Andy Lanning (based on the Marvel comics by), Steve Englehart (Star-Lord created by), Steve Gan (Star-Lord created by), Jim Starlin (Gamora and Drax created by), Stan Lee (Groot created by), Larry Lieber (Groot created by), Jack Kirby (Groot created by), Bill Mantlo (Rocket Raccoon created by), Keith Giffen (Rocket Raccoon created by), Steve Gerber (Howard the Duck created by), Val Mayerik (Howard the Duck created by)","Actors":"Chris Pratt, Zoe Saldana, Dave Bautista, Vin Diesel","Plot":"The Guardians struggle to keep together as a team while dealing with their personal family issues, notably Star-Lord's encounter with his father the ambitious celestial being Ego.","Language":"English","Country":"USA","Awards":"Nominated for 1 Oscar. Another 15 wins & 57 nominations.","Poster":"https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"7.6/10"},{"Source":"Rotten Tomatoes","Value":"85%"},{"Source":"Metacritic","Value":"67/100"}],"Metascore":"67","imdbRating":"7.6","imdbVotes":"578,093","imdbID":"tt3896198","Type":"movie","DVD":"10 Jul 2017","BoxOffice":"$389,813,101","Production":"Walt Disney Pictures, Marvel Studios","Website":"N/A","Response":"True"};
$("a[id=SearchButton]").on(click, function(e){
    e.preventDefault();
    datac =  document.getElementById("resData").innerHTML ;

    
    alert("Hello! I am an alert box!!"+datac);
     
    // document.getElementById("Poster").innerHTML = "<img class='image'src="+searchResult.Poster+"/>";
    // document.getElementById("Title").innerHTML  = searchResult.Title;
    // document.getElementById("Year").innerHTML   = searchResult.Year;
    // document.getElementById("Type").innerHTML  = searchResult.Type;

    // // //response data
    // document.getElementById("resData").innerHTML = datac;
    // alert("Hello! I am an alert box!!");
    // getSearchData.call();
     
 });






module.exports = server.exports();





















// var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
// var getSearchData = LocalServiceRegistry.createService("DeepaliOMDBIService1",{
//     createRequest: function(service,svcRequestData){
//         service.setRequestMethod("GET");
//         service.addHeader("Content-Type","text/json");
//         service.setURL(service.getURL()+"?apikey=567440b2"+"&s="+"cat");
//     },
//     parseResponse: function(service, response){
//         var resdata = {
//             text: !empty(response.text) ? response.text : '',
//             statusMessage: !empty(response.statusMessage) ? response.statusMessage : '',
//             statusCode: !empty(response.statusCode) ? response.statusCode : ''
//         };
//         dw.system.Logger.warn('ResponseData2:'+response.text);
//         document.getElementById("resData").innerHTML = response.text;
//         datac=response.text;
//         return response.text;
//     }
// });


