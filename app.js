$(function(){  //document ready
  $('#getXML').click(function (e) {
  	$.ajax({
      type: "GET",
      dataType: "xml",
      url: "http://web.mta.info/developers/data/nyct/nyct_ene.xml",
      success: function(data){
    		console.log(data);
      }, error: function(data) {
      		console.log("my bad, try again")
    	}
    });
  });
});


// "http://cors.io/?u=http://web.mta.info/developers/data/nyct/nyct_ene.xml"