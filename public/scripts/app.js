//ANGULAR TIME

var app = angular.module('elevatorApp', ['ngRoute']);


app.controller('ElevatorController', ['$http', '$scope', function($http, $scope){
 
 var controller=this;


///ANGULAR - THIS API CALL USES JSON CONVERTED VIA XML2JSON plugin by Fyneworks///

  this.makeAPICall = function(){
    $.get('/feed', function(xml){ 
        var json = $.xml2json(xml); //json will get all the json
        controller.outage = json.outage; //will get outages as objects in an array
    })  
   }; 
  this.makeAPICall();

//to get boroughs
  // this.getBoroughs = function () {
  //   $.get('/feed', function(xml){ 
  //     var json = $.xml2json(xml); //json will get all the json
  //     controller.outage = json.outage; //will get outages as objects in an array
  //     $scope.outage = json.outage; //same as above
  //     var boroCtrl;
 
  //     for (var i =0; i<controller.outage.length; i++) {
        
  //       $scope.boroCtrl = json.outage[i].borough;
  //       return boroCtrl;
  //     }; //end for loop
  //     console.log('boroCtrl',boroCtrl);
  //   }) 
  //  }; 

//TO GET OUTAGES BY TRAIN LINE - AM GETTING XML DATA, NOT CONVERTING TO JSON FIRST

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


         if (trainLines.includes(inputtedTrain)) {

          $('#info-box').append('<div class="station"><li>' + 
          $(singleOutage).find("station").text() +
          
          '</li><li> serving these trains: ' + 
          $(singleOutage).find("trainno").text() +

          '</li></div><table class="table-condensed"><tr><td>Borough: </td><td>' + 
          $(singleOutage).find("borough").text() +

          '</td></tr><tr><td>Elevator or escalator? </td><td>' 
          + $(singleOutage).find("equipment").text() +

          '</td></tr><tr><td>Location of outage: </td><td>' + 
          $(singleOutage).find("serving").text().toLowerCase() + 

          '</td></tr><tr><td>Reason: </td><td>' + 
          $(singleOutage).find("reason").text().toLowerCase() + 

          '</td></tr><tr><td>Back in Service on: </td><td>' + 
          $(singleOutage).find("estimatedreturntoservice").text() + 
          
          '</td></tr><tr><td>Out of Service since: </td><td>' + 
          $(singleOutage).find("outagedate").text() +
          '</td></tr></table>');

        } else {
          //console.log('not displaying since not correct trainline')
        };
       
      } else {
        console.log('possible err,single trainline is', trainLines)
       };

    })//end of data.find
   })
  }// closes getTrainLine()

}]); //closes ElevatorController


//ANGULAR CUSTOM FILTERS

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

app.filter('bxFilter', function(){
  return function(outage) {

   if (controller.outage[i].borough=='BX') {
    console.log(controller.outage[i]);
    return controller.outage[i];
   } 
 }         
});


// var test = "test string",
//     characters = test.split('');
// and then loop using regular Javascript, or else you can iterate over the string's characters using jQuery by

// var test = "test string";

// $(test.split('')).each(function (index,character) {
//     alert(character);
// });


// app.filter('BoroughFilter', function(value){
//   return element.name.match(/^M/) ? true : false;
//   }
// });

//Split string based on / to grab individual trainline
//var res = str.split("/");

//ANGULAR ROUTES

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
        controller:  'ElevatorController',
        controllerAs: 'elevator'
    }).when('/trainline',
      { templateUrl: 'angular-templates/trainline.html',
        controller:  'ElevatorController',
        controllerAs: 'elevator'          
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
