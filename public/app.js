
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////// JQUERY AJAX CALL WORKS YAYYYYYYYYYY /////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

   $('#get-xml').click(function(e) {
     $.ajax({
      type: "GET",
      dataType: "xml",
      url: '/feed',
      success: function(xml){
       var data = xml; //all data - complete document is returned
       //console.log(data);
//       var dataOne = data.data;
  //     console.log(dataOne);
       //alert($(data).find("responsecode").text()); //this works! yay
        $(data).find("outage").each(function(){
        //console.log($(xml).text()); //this works too! yay, it gives me all info per outage
       //console.log($(this).find("station").text()); this is working, printing all stations
      $('#info-box').append('<p>' + ($(this).find("station").text()) +'</p>');

// data.message.body.track_list[i].track.track_name + " by " +  data.message.body.track_list[0].track.artist_name + '</div>')
      //    alert($(this).find("station").text()); //yay gives all stations w outages 
//      if ($(this).find("station").text()){
        //$('#info-box').append('<p>' + this+ '</p>');
      
       // var data1= data.NYCOutages;
       // console.log(data1);
        })
//      })
     }, 
      error: function(data) {
        console.log("my bad, try again")
     },
    });
  });

 // $('ul').html('');
 //                if(data.Search !== undefined && data.Response !== "False"){
 //                  data.Search.forEach(function(item){
 //                    $('ul').append('<li>'+item.Title+'</li>');
 //                  });
 //                }
 //            },
///////////////////////////////////////////////////////////////////////
////??????????////////////ANGULAR TIME/////////////////////////////////
///////////////////////////////////////////////////////////////////////

//var app = angular.module('elevatorApp', []);

// app.controller('ElevatorController', ['$http', function($http) {
//   var controller = this;
//   $http.get('/feed').then(function (xml){
//       alert("GOT XML")
//         // console.log("xml is", xml);
//     // function process(xml) {
//     // $(xml).find("outage").each(function(){
//     //   alert($(this).text());
//       // if ($(this).find("station").text()="MN") {
//     //     alert($(this).find("station").text())
//     // 
//     //   }
//     // })
//       // }
//   //   }  
//    })
// }]);

// app.controller('ElevatorController', ['$http', function($http){
//   var controller=this;
//   $this.makeAPICall = function(){
//     var promise = $http.get('/feed');
//     promise.success(function(data){
//       this.info = data;
//       console.log(data);
//     })
//   }
// }])


    
    // var promise = $http.get('http://web.mta.info/developers/data/nyct/nyct_ene.xml');
    // promise.success(function(data) {
    //   controller.outages = data; //data is entire xml object
     //   console.log(data);
    // });


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


// +$(function(){  //document ready
// +    $.get("http://web.mta.info/developers/data/nyct/nyct_ene.xml", function(xml){
// +        var json = $.xml2json(xml);
// +
// +        alert(json.outage[1].station + '/' + json.outage[1].borough  + '/' + json.outage[1].borough +'/' + json.outage[1].estimatedreturntoservice);
// +    })
// +});
// +
// +//TEST ABOVE NEXT


// +$.get("http://web.mta.info/developers/data/nyct/nyct_ene.xml", function(xml){
// +  $('#info-box').html(''); 
// +  var json = $.xml2json(xml);
// +  
// +  $.each(json.???rss.channel.item???, function(i, outage){
// +    $('#info-box').append('<p>'
// +      '<strong>'+outage.station+'</strong><br/>'
// +      '<u>Borough</u>: '+outage.borough+'<br/>'
// +      '<u>Back to Service</u>: '+outage.estimatedreturntoservice+'<br/>'
// + 
// +    '</p>');
// +  });
// +});

//  $('#getXML').click(function(e) {
//      $.ajax({
//     type: "GET",
//     dataType: "xml",
//     url: '/feed',
 
//     success: function(data){ //data returns everything 

//       console.log(data);
//       var data = data;
//         // $(data).find("outage").each(function(){
//        //  $("#info-box").append($(data).find("station").text() + "<br />")
//        }, error: function(data) {
//         console.log("my bad, try again");
//       }
//    });
//   });
// })

// insdie of server.js u make a requset to /feed ..... 
// npm request is a npm that matt uses in OAUTH.. so the server can make the request, but the angular cannot
// Angular going to make ajax request to own server. in that route for that url you just hit. the server is going to make anotehr req to anohter 