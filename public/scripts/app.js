///ANGULAR - THIS CONVERTS XML TO JSON USING XML2JSON plugin by Fyneworks///

var app = angular.module('elevatorApp', ['ngRoute']);

app.controller('ElevatorController', ['$http', function($http){
  var controller=this;
//  this.makeAPICall = function(){
    $.get('/feed', function(xml){ 
        var json = $.xml2json(xml); 
        //console.log(json); all json
        controller.outage = json.outage;
        //console.log(json.outage) //outages as objects in array 
    }); 
//}
}])

app.filter('equipmentFilter', function() {
   return function(word) {
   var charZero = word.charAt(0);
   var charOne = word.charAt(1);
        if (charZero=='E' && charOne=='L') {
          return "elevator";
        } else {
          return "escalator";
        }
     }
    
})
//ANGULAR ROUTES

// app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
//   $locationProvider.html5Mode({enabled:true});

//   $routeProvider.
//     when('/borough',
//     { templateUrl: '/angular_templates/borough.html',
//         controller:  'ElevatorController',
//         controllerAs: 'elevator'
//   // by train line - accessible only by logging in
//     }).when('/train',
//       { templateUrl: '/angular_templates/trainline.html',
//         controller:  'ElevatorController',
//         controllerAs: 'elevator'
//     // SHOW ONE MOOD
//     // }).when('/users/:id',
//     //   { templateUrl: '/angular_templates/user.html',   ///SHOW ONE PAGE
//     //     controller:  'HeaderController',
//     //     controllerAs: 'header'
//     }).otherwise(
//       { redirectTo: '/'
//     });
//  }]) ;



///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////// JQUERY AJAX CALL WORKS YAYYYYYYYYYY /////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

  //  $('#get-xml').click(function(e) {
  //    $.ajax({
  //     type: "GET",
  //     dataType: "xml",
  //     url: '/feed',
  //     success: function(xml){
  //        var data = xml; //all data - complete document is returned
  //        alert($(data).find("responsecode").text()); //this works! yay
  //        $(data).find("outage").each(function(){
  //        var singleOutage = this;
  //        console.log($(xml).text()); //this works too! yay, it gives me all info per outage
  //        console.log($(this).find("station").text()); this is working, printing all stations
  //    
  //        $('#info-box').append('<p class="station">' + $(singleOutage).find("station").text() +
  //       '</p><p class="whichTrain"> with the ' + $(singleOutage).find("trainno").text() +
  //       ' trains</p><p class="boro">Borough: ' + $(singleOutage).find("borough").text() +
  //       '</p><p class="whichExactly">Elevator or escalator?' + $(singleOutage).find("equipment").text() +
  //       '</p><p class="why">Reason? ' + $(singleOutage).find("reason").text() +
  //       '</p><p class="whenReturning">Estimated Return to Service on: ' + $(singleOutage).find("estimatedreturntoservice").text() + 
  //       '</p><p class="whenOutageStarted">Out of service since: ' + $(singleOutage).find("outagedate").text() +
  //       '<hr />');
  //      })
  //    }, 
  //     error: function(data) {
  //       console.log("my bad, try again")
  //    },
  //   });
  // });


///////////////////////////////////////////////////////////////////////
////??????????////////////ANGULAR TIME/////////////////////////////////
///////////////////////////////////////////////////////////////////////

// THIS WORKS TOO YAYYY

// app.controller('ElevatorController', ['$http', function($http){
//   var controller=this;
//   this.makeAPICall = function(){
//     var promise = $http.get('/feed');
//     promise.success(function(data){
//       controller.allData = data;
//     $(data).find("outage").each(function(){
//          var singleOutage = this;
//         //console.log($(xml).text()); //this works too! yay, it gives me all info per outage
//        //console.log($(this).find("station").text()); this is working, printing all stations
//       $('#info-box').append('<p class="station">' + $(singleOutage).find("station").text() +
//         '</p><p class="whichTrain"> with the ' + $(singleOutage).find("trainno").text() +
//         ' trains</p><p class="boro">Borough: ' + $(singleOutage).find("borough").text() +
//         '</p><p class="whichExactly">Elevator or escalator?' + $(singleOutage).find("equipment").text() +
//         '</p><p class="why">Reason? ' + $(singleOutage).find("reason").text() +
//         '</p><p class="whenReturning">Estimated Return to Service on: ' + $(singleOutage).find("estimatedreturntoservice").text() + 
//         '</p><p class="whenOutageStarted">Out of service since: ' + $(singleOutage).find("outagedate").text() +
//         '<hr />');
//     })
//   })
// }
// }])
