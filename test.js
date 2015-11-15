var map;
var directionsService;
var directionsDisplay;

function initMap(){
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


	/*map.addListener('click', function(e){
		placeMarkerAndPanTo(e.latLng, map);
	});

	function placeMarkerAndPanTo(latLng, map){
		marker.setPosition(latLng);
		map.panTo(latLng);
	}
	*/

	/*
	Pans back to marker when center is changed:

	map.addListener('center_changed', function(){
		window.setTimeout(function(){
			map.panTo(marker.getPosition());
		}, 3000);
	});

	marker.addListener('click', function(){
		map.setZoom(8);
		map.setCenter(marker.getPosition());
	});*/

}

function displayRoute(startMarker, endMarker){
    var start = startMarker.getPosition();
    var end   = endMarker.getPosition();

    var request = {
        origin:start,
        destination:end,
        travelMode:google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, function (result, status) 
    {
        if(status == google.maps.DirectionsStatus.OK){
            directionsDisplay.setDirections (result);

            pointsArray = response.routes[0].overview_path;
      		console.log("Points");
       		console.log(pointsArray[0].lat());
      		console.log(pointsArray[0].lng());
      
      		var pointArray = [];
      
      		for (var j=0; j< pointsArray.length;j++) {
	        	var myLatLngTemp = {lat: pointsArray[j].lat(), lng:pointsArray[j].lng()};
	        	var newmarker = new google.maps.Marker({
	        		position: myLatLngTemp,
	        		map: map,
	        		title: 'Hello World!'
	      		});
       		}
       	}

        else {
        	alert("Error: " + status);
        }
    });
}
