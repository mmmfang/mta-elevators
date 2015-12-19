///////////////////////////////////////////////////////////////////////
///////////////// ANGULAR TIME/////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

var app = angular.module('elevatorApp', ['ngRoute']);

///////////////////////////////////////////////////////////////////////
///////////////// ELEVATOR CONTROLLER /////////////////////////////////
///////////////////////////////////////////////////////////////////////
app.controller('ElevatorController', ['$http', '$scope', function($http, $scope){
 
 var controller=this;
  
  ///THIS API CALL USES JSON CONVERTED VIA XML2JSON plugin by Fyneworks///
  this.makeAPICall = function(){
    $.get('/feed', function(xml){ 
        var json = $.xml2json(xml); //json will get all the json
        controller.outage = json.outage; //gets outages as objects in an array
    })  
   }; 
  this.makeAPICall();

  //  angular.element(document).ready(function () {
  //     controller.makeAPICall();
  //     controller.makeAPICallRedux();
  //  }); 
   //works with an alert for ex, but not to make 

}]); 

///////////////////////////////////////////////////////////////////////
////////////////// BOROUGH CONTROLLER /////////////////////////////////
///////////////////////////////////////////////////////////////////////

app.controller("BoroughController", function(){
  this.boroughValue = '';
  var controller=this;
  this.makeAPICall = function(){
    $.get('/feed', function(xml){ 
        var json = $.xml2json(xml); //json will get all the json
        controller.allOutages = json.outage; //gets outages as objects in an array
    })  
   }; 
  this.makeAPICall();
})

//TOOLTIP FOR THE BOROUGH PAGE
$('#tooltip-title').tooltip('hover');


///////////////////////////////////////////////////////////////////////
//////////////////// TRAIN CONTROLLER /////////////////////////////////
///////////////////////////////////////////////////////////////////////
app.controller("TrainlineController", ['$http', '$scope', function($http, $scope){

  var controller=this;

  //TO GET OUTAGES BY TRAIN LINE - USING THE XML DATA
  this.getTrainLines = function(trainno){
    var inputtedTrain=trainno;

    var promise = $http.get('/feed');
    promise.success(function(data){
      controller.allData = data;

    $(data).find("outage").each(function(){
      var singleOutage = this;
      var trainLines= $(singleOutage).find("trainno").text(); 

       if (trainLines.length >= 1) {
          var trainArray=trainLines.split("/");
          for (var i=0; i<trainArray.length; i++) {
            //console.log('tl split for this el', i ,trainArray[i]);
            console.log('fulltrainarray', trainLines);
          } 

          var checkEquip = $(singleOutage).find("equipment").text()
          var whichEquipment = elOrEsc(checkEquip);

          var findBoro = $(singleOutage).find("borough").text()
          var whichBoro =  filterBoro(findBoro);

         if (trainLines.includes(inputtedTrain)) {

          $('#box').append('<div id="info-box"><div class="station-tl"><li>' + 
          $(singleOutage).find("station").text() +
          
          '</li><li> serving these trains: ' + 
          $(singleOutage).find("trainno").text() +

          '</li></div><table class="table-condensed"><tr><td>Borough: </td><td>'  
          + whichBoro +

          '</td></tr><tr><td>Elevator or escalator? </td><td>' 
          + whichEquipment +

          '</td></tr><tr><td>Location of outage: </td><td>' + 
          $(singleOutage).find("serving").text() + 

          '</td></tr><tr><td>Reason: </td><td>' + 
          $(singleOutage).find("reason").text().toLowerCase() + 

          '</td></tr><tr><td>Back in Service on: </td><td>' + 
          $(singleOutage).find("estimatedreturntoservice").text() + 
          
          '</td></tr><tr><td>Out of Service since: </td><td>' + 
          $(singleOutage).find("outagedate").text() +
          '</td></tr></table></div>');

        } else {
          //console.log('not displaying since not correct trainline')
        };
       
      } else {
        console.log('possible err,single trainline is', trainLines)
      };

      });

      function elOrEsc(word){
        var charZero = word.charAt(0);
        var charOne = word.charAt(1);

        if (charZero=='E' && charOne=='L') {
          return "Elevator";
        } else {
          return "Escalator";
        }
      };


      function filterBoro(word) {
        var charCero = word.charAt(0);
        var charUno = word.charAt(1);

        if (charCero=='M' && charUno=='N') {
          return "Manhattan";
        } else if (charCero=='Q' && charUno=='N') {
          return "Queens";
        } else if (charCero=='B' && charUno=='K') {
          return "Brooklyn"
        } else if (charCero=='B' && charUno=='X') {
          return "Bronx"
        } else {
          return "N/A"
        }
     };

    })//end of data.find
  
  }// closes getTrainLine()  
}]);//closing Trainline Controller


///////////////////////////////////////////////////////////////////////
//////////////////// ANGULAR CUSTOM FILTERS////////////////////////////
///////////////////////////////////////////////////////////////////////


//To display whether elevator or escalator is broken
app.filter('equipmentFilter', function() {
   return function(word) {
   var charZero = word.charAt(0);
   var charOne = word.charAt(1);
        if (charZero=='E' && charOne=='L') {
          return "Elevator";
        } else {
          return "Escalator";
        }
     }
});

//To display full borough name from abbreviation provided
app.filter('boroFilter', function() {
   return function(word) {
   var charZero = word.charAt(0);
   var charOne = word.charAt(1);
        if (charZero=='M' && charOne=='N') {
          return "Manhattan";
        } else if (charZero=='Q' && charOne=='N') {
          return "Queens";
        } else if (charZero=='B' && charOne=='K') {
          return "Brooklyn"
        } else if (charZero=='B' && charOne=='X') {
          return "Bronx"
        } else {
          return "N/A"
        }
     }
});


// $(function () {
//   $('[data-toggle="tooltip"]').tooltip()
// })



///////////////////////////////////////////////////////////////////////
////////////////// ANGULAR ROUTING // /////////////////////////////////
///////////////////////////////////////////////////////////////////////

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode({enabled:true});

  $routeProvider.
    when('/about',
    { templateUrl: '/angular-templates/about.html',
        controller: 'ElevatorController',
        controllerAs: 'elevator'
    }).when('/all',
    { templateUrl: 'angular-templates/all.html',
        controller:  'ElevatorController',
        controllerAs: 'elevator'
    }).when('/borough',
    { templateUrl: 'angular-templates/borough.html',
        controller:  'BoroughController',
        controllerAs: 'borough'
    }).when('/station',
      { templateUrl: 'angular-templates/subwaystation.html',
        controller:  'ElevatorController',
        controllerAs: 'elevator'        
    }).when('/trainline',
      { templateUrl: 'angular-templates/trainline.html',
        controller:  'TrainlineController',
        controllerAs: 'train'     
    }).when('/onetrainline',
      { templateUrl: 'angular-templates/specifictrainline.html',
        controller:  'TrainlineController',
        controllerAs: 'train'       
    }).otherwise(
      { redirectTo: '/'
    });
 }]) ;



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
