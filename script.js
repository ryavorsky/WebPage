var i = 0;

var Addr=[["(7814) 337 884","Prospekt Lenina, 33"],["(7814) 217 234","Prospekt Lenina 21"],["(7814) 294 534","Gogol street, 29"],["(7814) 282 112","Krasnaya, 28"]];

function upd(){
    i = (i+1)%13;
    j = i % 4;
    document.body.background = "pic/p" + String(i) + ".jpg";
    na = document.getElementById("navi_addr");
    na.innerHTML = Addr[j][0];
    pa = document.getElementById("post_addr");
    pa.innerHTML = Addr[j][1] + ", Petrozavodsk, Republic of Karelia, 185000, RUSSIA";
    cmap();
}

function c(){
    e = document.getElementById("search");
    e.style.backgroundColor = "white";
    e.style.color = "rgb(90,90,125)";
    e.value="";
}

function search(event){
    e = document.getElementById("search");
    if(event.keyCode === 13){
        upd();
        e.style.backgroundColor = "rgba(250,255,255,.90)";
        e.style.color = "rgb(170,170,170)";
        e.value="Search by naviaddress, tele address, post address";
    }
}

function show(){
    e = document.getElementById("content1");
    e.style.opacity = "1.0";
}

function hide(){
    e = document.getElementById("content1");
    e.style.opacity = "0.5";   
}

var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var geocoder = new google.maps.Geocoder();
var map;
var marker = new google.maps.Marker({map: map});

function initialize() {
  directionsDisplay = new google.maps.DirectionsRenderer();
  var mapOptions = {
    zoom:17
  };
  map = new google.maps.Map(document.getElementById('content1'), mapOptions);
  directionsDisplay.setMap(map);
  cmap()
}

function cmap(){
  marker.setMap(null);
  pa = document.getElementById("post_addr");
  var address = pa.innerHTML;
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}
function calcRoute() {

  var cityId = parseInt(document.getElementById('city').value);  
  var start = text2array(document.getElementById('start').value);
  var end = text2array(document.getElementById('end').value);

  var request = {
      origin: locate(cityId, start) ,
      destination: locate(cityId, end) ,
      travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    }
  });
}
