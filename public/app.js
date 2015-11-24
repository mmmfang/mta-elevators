
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
       //alert($(data).find("responsecode").text()); //this works! yay
        $(data).find("outage").each(function(){
          var singleOutage = this;
        //console.log($(xml).text()); //this works too! yay, it gives me all info per outage
       //console.log($(this).find("station").text()); this is working, printing all stations
      $('#info-box').append('<p class="station">' + $(singleOutage).find("station").text() +
        '</p><p class="whichTrain"> with the ' + $(singleOutage).find("trainno").text() +
        ' trains</p><p class="boro">Borough: ' + $(singleOutage).find("borough").text() +
        '</p><p class="whichExactly">Elevator or escalator?' + $(singleOutage).find("equipment").text() +
        '</p><p class="whenReturning">Estimated Return to Service on: ' + $(singleOutage).find("estimatedreturntoservice").text() + '<hr />');

        })
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


    
  


// $.get('data/animals.xml', function(xml){
// var animals = $.xml2json(xml);
// alert(animals.dog[1].name +'/'+ animals.dog[1]);
// });

// function xmlParser(xml)) {
//     $('#load').fadeOut();
//     $(xml).find("Book").each(function () {
//         $(".main").append('<div class="book"><div class="title">' + 
//  $(this).find("Title").text() + '</div><div class="description">' + 
//  $(this).find("Description").text() + '</div><div class="date">Published ' + 
//  $(this).find("Date").text() + '</div></div>');
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