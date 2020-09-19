 
const axios = require("axios")
const express = require("express")

const router = express.Router()

var current = document.getElementById('cur_loc').value;
var final = document.getElementById('fin_loc').value;
    // Listen for submiot
  
  //find route pin
  var locationForm = document.getElementById('signedin');

   

    function geocode(location ){
      // Prevent actual submit
     // e.preventDefault();

      var location = document.getElementById('location-input').value;

      axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
        params:{
          address:location,
          key:'AIzaSyBO59mo6rMe4ChzmBqEQ8gz9QmWjg_X38c'
        }
      })
      .then(function(response){
        // Log full response
        console.log(response);

    
        // Geometry
        var lat = response.data.results[0].geometry.location.lat;
        var lng = response.data.results[0].geometry.location.lng;

        return [lat ,lng]
      
      })
      .catch(function(error){
        console.log(error);
      });
    }
    var i1 = geocode(cur_loc) 
    var i2 = geocode(fin_loc)

    locationForm.addEventListener('click', ge);



// ######################################################################################################################################################################
var directionsService = new google.maps.DirectionsService();

var myOptions = {
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.ROADMAP
}

var map = new google.maps.Map(document.getElementById("map"), myOptions);


var st = new google.maps.LatLng(i1[0], i1[1]);
var en = new google.maps.LatLng(i2[0], i2[1]);

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

module.exports = router