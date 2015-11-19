// var app = angular.module('elevatorApp', []);

// app.controller('ElevatorController', ['$http', function($http) {
//   var controller = this;
//       $http.get('http://web.mta.info/developers/data/nyct/nyct_ene.xml', function(xml){
//         var data = $.xml2json(xml);

//         alert(data.outage[1].station + '/' + data.outage[1].borough  + '/' + data.outage[1].borough +'/' + data.outage[1].estimatedreturntoservice);
//     })
//     // var promise = $http.get('http://web.mta.info/developers/data/nyct/nyct_ene.xml');
//     // promise.success(function(data) {
//     //   controller.outages = data; //data is entire xml object
//     //   console.log(data);
//     // });


// // });
// }]);


// $.get('data/animals.xml', function(xml){
// var animals = $.xml2json(xml);
// alert(animals.dog[1].name +'/'+ animals.dog[1]);
// });

// function xmlParser(xml)) {
//     $('#load').fadeOut();
//     $(xml).find("Book").each(function () {
//         $(".main").append('<div class="book"><div class="title">' + $(this).find("Title").text() + '</div><div class="description">' + $(this).find("Description").text() + '</div><div class="date">Published ' + $(this).find("Date").text() + '</div></div>');
//         $(".book").fadeIn(1000);

//     });

// }

// $('Contact',xml).each(function() {
//   srno = parseInt($(this).find("srno").text());
//   empId = $(this).find("empid").text();
//   name = $(this).find("name").text();
//   contact = $(this).find("contact-data").text();
//   type = $(this).find("type").text();
// })

// $('#getXML').click(function(e) {
//   $.ajax({
//    type: "GET",
//    dataType: "xml",
//    url: "http://web.mta.info/developers/data/nyct/nyct_ene.xml",
//    success: function(data){
//        console.log(data);
//        var data = data;
//     }, error: function(data) {
//      console.log("my bad, try again")
//    },
//   });
// });
//THE AJAX JQUERY CALL WORKS WITH THE BUTTON ON THE HTML


$(function(){  //document ready
    $.get("http://web.mta.info/developers/data/nyct/nyct_ene.xml", function(xml){
        var json = $.xml2json(xml);

        alert(json.outage[1].station + '/' + json.outage[1].borough  + '/' + json.outage[1].borough +'/' + json.outage[1].estimatedreturntoservice);
    })
});

//TEST ABOVE NEXT



$.get("http://web.mta.info/developers/data/nyct/nyct_ene.xml", function(xml){
  $('#info-box').html(''); /* clear result div */
  var json = $.xml2json(xml);
  
  $.each(json.???rss.channel.item???, function(i, outage){
    $('#info-box').append('<p>'
      '<strong>'+outage.station+'</strong><br/>'
      '<u>Borough</u>: '+outage.borough+'<br/>'
      '<u>Back to Service</u>: '+outage.estimatedreturntoservice+'<br/>'
 
    '</p>');
  });
});

// "http://cors.io/?u=http://web.mta.info/developers/data/nyct/nyct_ene.xml"