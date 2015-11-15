var map;
var directionsService;
var directionsDisplay;

function initMap() {
	directionsService = new google.maps.DirectionsService();
	directionsDisplay = new google.maps.DirectionsRenderer();
		
		

	var myLatLng = {lat: 41.850033, lng: -87.6500523};

	map = new google.maps.Map(document.getElementById('map'), {
		center: myLatLng,
		zoom: 8, 
		mapTypeId:google.maps.MapTypeId.ROADMAP	
	});

	directionsDisplay.setMap(map);

  var startMarker, endMarker;
	startMarker = new google.maps.Marker({
		title: 'Start',
		label: 'Start',
		position: null
	});

	endMarker = new google.maps.Marker({
		title:'Destination', 
		label: 'Destination',
		position: null
	});

	map.addListener('click', function(e){
		setMarkers(e.latLng, map);
	});

	function setMarkers(latLong, map){
		if(startMarker.getPosition() == null){
			startMarker.setPosition(latLong);

			startMarker.setMap(map);
		}
		else{
			if(endMarker.getPosition() == null){
				endMarker.setPosition(latLong);
				startMarker.setMap(map);
				endMarker.setMap(map);

				displayRoute(startMarker, endMarker);
			}
			else{
				endMarker.setPosition(null);
				startMarker.setPosition(latLong);
				startMarker.setPosition(map);
			}
		}
	}
}

function displayRoute(startMarker, endMarker) {

	var start = startMarker.getPosition();
    var end   = endMarker.getPosition();

    var req = {
    	origin: start,
    	destination: end,
    	travelMode: google.maps.TravelMode.DRIVING
    };

	directionsService.route(req, function(response, status) {
    	if (status === google.maps.DirectionsStatus.OK) {
      	document.getElementById('warnings-panel').innerHTML = '<b>' + response.routes[0].warnings + '</b>';

     	directionsDisplay.setDirections(response);
      
      	pointsArray = response.routes[0].overview_path;
      	console.log("Points");
      	console.log(pointsArray[0].lat());
      	console.log(pointsArray[0].lng());

      	wayPoints = [];

      	for (var j = 0; j < pointsArray.length; j += 15) {
      		wayLat = pointsArray[j].lat();
      		wayLng = pointsArray[j].lng();

        	var myLatLngTemp = {lat: wayLat, lng: wayLng};

	       //var newmarker = new google.maps.Marker({
	        //	position: myLatLngTemp,
	       // 	map: map,
	        //	title: "waypoint "+j
      		//});

      		requestJson(wayLat, wayLng, map);
    	}
      
    } else {
      alert('Error: ' + status);
    }
  });

}

