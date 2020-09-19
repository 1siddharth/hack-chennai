var directionsService = new google.maps.DirectionsService();

var myOptions = {
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.ROADMAP
}

var map = new google.maps.Map(document.getElementById("map"), myOptions);


var st = new google.maps.LatLng(33.7294, 73.0931);
var en = new google.maps.LatLng(34.0150, 71.5805);

var request = {
    origin: st,
    destination: en,
    travelMode: google.maps.DirectionsTravelMode.DRIVING,
    // Returns multiple routes
    provideRouteAlternatives: true
};

directionsService.route(request, function (response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
        console.log(response.routes);
        // Create a new DirectionsRenderer for each route
        for (var i = 0; i < response.routes.length; i++) {
            var dr = new google.maps.DirectionsRenderer();
            dr.setDirections(response);
            // Tell the DirectionsRenderer which route to display
            dr.setRouteIndex(i);
            dr.setMap(map);

            // Display the distance:
            document.getElementById('distance').innerHTML += "Route " + i + ": " +
              (response.routes[i].legs[0].distance.value) / 1000 + "killo meters, ";
            console.log((response.routes[i].legs[0].distance.value) / 1000 + "killo meters");
            // Display the duration:
            document.getElementById('duration').innerHTML += "Route " + i + ": " +
              response.routes[i].legs[0].duration.value + " seconds, ";
            console.log(response.routes[i].legs[0].duration.value + " seconds");
        }




    }
});