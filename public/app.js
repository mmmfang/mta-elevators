
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
  //      var data = xml; //all data - complete document is returned
  //      //alert($(data).find("responsecode").text()); //this works! yay
  //       $(data).find("outage").each(function(){
  //         var singleOutage = this;
  //       //console.log($(xml).text()); //this works too! yay, it gives me all info per outage
  //      //console.log($(this).find("station").text()); this is working, printing all stations
  //     $('#info-box').append('<p class="station">' + $(singleOutage).find("station").text() +
  //       '</p><p class="whichTrain"> with the ' + $(singleOutage).find("trainno").text() +
  //       ' trains</p><p class="boro">Borough: ' + $(singleOutage).find("borough").text() +
  //       '</p><p class="whichExactly">Elevator or escalator?' + $(singleOutage).find("equipment").text() +
  //       '</p><p class="why">Reason? ' + $(singleOutage).find("reason").text() +
  //       '</p><p class="whenReturning">Estimated Return to Service on: ' + $(singleOutage).find("estimatedreturntoservice").text() + 
  //       '</p><p class="whenOutageStarted">Out of service since: ' + $(singleOutage).find("outagedate").text() +
  //       '<hr />');
  //       })

  //    }, 
  //     error: function(data) {
  //       console.log("my bad, try again")
  //    },
  //   });
  // });


///////////////////////////////////////////////////////////////////////
////??????????////////////ANGULAR TIME/////////////////////////////////
///////////////////////////////////////////////////////////////////////

var app = angular.module('elevatorApp', []);

// THIS WORKS TOO
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

//TRYING TO USE THE XML2JSON converter but didnt work.. no errors but other errors include could be be instatiated
app.controller('ElevatorController', ['$http', function($http){
  var controller=this;
  this.makeAPICall = function(){
  $.get('/feed', function(xml){ 
    var json = $.xml2json(xml); 
    controller.outage = json.outage;
    console.log(json); //all json
    console.log(json.outage) //outages as objects in array 
  });
}
}])





// app.controller('ElevatorController', ['$http', function($http){
//   var controller=this;
//   var allBoroughs = new Array();
//   this.makeAPICall = function(){
//     $http.get('/feed').success(function(data){
//       controller.allData = data;
//     $(data).find("outage").each(function(){
//         allBoroughs.push($(this).find())
//          var singleOutage = this;
//         //console.log($(data).text()); //this works too! gives me all info per outage in giant text block
//        var boroughs=($(singleOutage).find("borough").text()); //this is working, printing all stations
//        console.log(boroughs)
//       // $('#info-box').append('<p class="station">' + $(singleOutage).find("station").text() +
//       //   '</p><p class="whichTrain"> with the ' + $(singleOutage).find("trainno").text() +
//       //   ' trains</p><p class="boro">Borough: ' + $(singleOutage).find("borough").text() +
//       //   '</p><p class="whichExactly">Elevator or escalator?' + $(singleOutage).find("equipment").text() +
//       //   '</p><p class="why">Reason? ' + $(singleOutage).find("reason").text() +
//       //   '</p><p class="whenReturning">Estimated Return to Service on: ' + $(singleOutage).find("estimatedreturntoservice").text() + 
//       //   '</p><p class="whenOutageStarted">Out of service since: ' + $(singleOutage).find("outagedate").text() +
//       //   '<hr />');
//     })
//   }).error(function(err){
//     console.log('error making xml call')
//   })
// }
// }])

        // .controller("MyController", function($scope, $http) {
        //     $scope.myData = {};
        //     $scope.myData.doClick = function(item, event) {

        //         var responsePromise = $http.get("/angularjs-examples/json-test-data.jsp");

        //         responsePromise.success(function(data, status, headers, config) {
        //             $scope.myData.fromServer = data.title;
        //         });
        //         responsePromise.error(function(data, status, headers, config) {
        //             alert("AJAX failed!");
        //         });
        //     }



// insdie of server.js u make a requset to /feed ..... 
// npm request is a npm that matt uses in OAUTH.. so the server can make the request, but the angular cannot
// Angular going to make ajax request to own server. in that route for that url you just hit. the server is going to make anotehr req to anohter 