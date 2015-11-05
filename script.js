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
    e = document.getElementById("search_input");
    e.style.backgroundColor = "white";
    e.style.color = "rgb(90,90,125)";
    e.value="";
}

function search(event){
    e = document.getElementById("search_input");
    if(event.keyCode === 13){
        e.style.backgroundColor = "rgba(250,255,255,.90)";
        e.style.color = "rgb(170,170,170)";
        e.value="Search by naviaddress, tele address, post address";
        upd();
    }
}

var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var geocoder = new google.maps.Geocoder();
var map1;
var map2;
var map3;
var map4;
var maps = [map1, map2, map3, map4]
var goldStar = {
    path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
    fillColor: 'rgba(255,255,55,0.75)',
    fillOpacity: 0.8,
    scale: 0.07,
    strokeColor: 'rgba(100,100,100,0.5)',
    strokeWeight: 2
  };

var marker1 = new google.maps.Marker({map: map1});
var marker2 = new google.maps.Marker({map: map2});
var marker3 = new google.maps.Marker({icon: goldStar, map: map3});
var marker4 = new google.maps.Marker({map: map4});
var markers = [marker1, marker2, marker3, marker4]
var image1 = 'red_flag32.png'
var image2 = 'red_flag.png'
var image3 = 'red_ball.png'
var pinIcon1 = new google.maps.MarkerImage(
    "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FFEE10",
    null, /* size is determined at runtime */
    null, /* origin is 0,0 */
    null, /* anchor is bottom center of the scaled image */
    new google.maps.Size(10, 15)
); 
var pinIcon2 = new google.maps.MarkerImage(
    "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|DDEE10",
    null, /* size is determined at runtime */
    null, /* origin is 0,0 */
    null, /* anchor is bottom center of the scaled image */
    new google.maps.Size(13, 21)
); 
var pinIcon3 = new google.maps.MarkerImage(
    "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FF8888"
); 

function initialize() {
  //directionsDisplay = new google.maps.DirectionsRenderer();
  var mapOptions1 = {
    zoom:3,
    disableDefaultUI: true
  };
  var mapOptions2 = {
    zoom:10,
    disableDefaultUI: true
  };
  var mapOptions3 = {
    zoom:16,
    disableDefaultUI: true,
    styles: [{"featureType":"road.highway","elementType":"labels","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"on"}]},{"featureType":"road","elementType":"all","stylers":[{"hue":"#ffe94f"},{"saturation":100},{"lightness":4},{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"hue":"#ffe94f"},{"saturation":100},{"lightness":4},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#333333"},{"saturation":-100},{"lightness":-74},{"visibility":"off"}]}]
  };
  var mapOptions4 = {
    zoom:16,
    disableDefaultUI: true,
    mapTypeId: google.maps.MapTypeId.HYBRID
  };
  map1 = new google.maps.Map(document.getElementById('google_map1'), mapOptions1);
  map2 = new google.maps.Map(document.getElementById('google_map2'), mapOptions2);
  map3 = new google.maps.Map(document.getElementById('google_map3'), mapOptions3);
  map4 = new google.maps.Map(document.getElementById('google_map4'), mapOptions4);
  maps = [map1, map2, map3, map4];
  //directionsDisplay.setMap(map1);
  cmap(1);
  cmap(2);
  cmap(3);
  cmap(4);
}

function cmap(i){
  markers[i-1].setMap(null);
  pa = document.getElementById("post_addr_value");
  var address = pa.innerHTML;
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      maps[i-1].setCenter(results[0].geometry.location);
      if(i<4){
          marker = new google.maps.Marker({
            map: maps[i-1],
            position: results[0].geometry.location
          });
      }
      if (i==1){
        marker.setIcon(image1);
      };
      if (i==2){
        marker.setIcon(image2);
      }
      if (i==3){
        marker.setIcon(image3);
      };
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
