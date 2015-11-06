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

var map_center;
var places;

var map1;
var map2;
var map3;
var maps = [];

var marker1 = new google.maps.Marker({map: map1});
var marker2 = new google.maps.Marker({map: map2});
var marker3 = new google.maps.Marker({map: map3});
var markers = [marker1, marker2, marker3];
var image1 = 'red_flag32.png';
var image2 = 'red_flag.png';
var image3 = 'red_ball.png';
var images = [image1, image2, image3];

function initialize() {
   var mapOptions1 = {
    zoom:3,
    disableDefaultUI: true
  };
  var mapOptions2 = {
    zoom:10,
    disableDefaultUI: true
  };
  var mapOptions3 = {
    zoom:16
  };
  map1 = new google.maps.Map(document.getElementById('google_map1'), mapOptions1);
  map2 = new google.maps.Map(document.getElementById('google_map2'), mapOptions2);
  map3 = new google.maps.Map(document.getElementById('google_map3'), mapOptions3);
  maps = [map1, map2, map3];

  // Use geocoding to get the center coordinates
  post_addr = document.getElementById("post_addr_value");
  var address = post_addr.innerHTML;
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) { 
        map_center = results[0].geometry.location;
        for(var i=0; i<3; i++){
            maps[i].setCenter(map_center);
            marker = new google.maps.Marker({
                map: maps[i],
                position: map_center
            });
            marker.setIcon(images[i]);
        };
        get_places(1000);
        pan();
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
  

}


function get_places(range) {
    var request = {
        radius: range.toString(),
        //rankBy: google.maps.places.RankBy.DISTANCE,
        location: map_center
    };
    var service = new google.maps.places.PlacesService(map3);
    service.nearbySearch(request, places_callback);
}

function places_callback(results , status, pagination) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
            places = results;
    };
    
    icons=[];
    res = [];
    space = '&nbsp;&nbsp;';
    for (i=0; i < places.length; i++){
        big_img = '<img width="20px" src="' + places[i].icon +'" / > ';
        small_img = '<img width="16px" src="' + places[i].icon +'" / >&nbsp;';
        name = places[i].name;
        addr = '<a href="' + places[i].vicinity + '">' + name + '</a>';
        
        icons.push(big_img);
        res.push(small_img + addr);
    };
    
    icons = icons.sort();
    for (i=1; i<icons.length; i++){
        if (icons[i] != icons[i-1]){
            icons[i-1] = icons[i-1] + space;
        }
    }
    
    ic = document.getElementById('icons');
    ic.innerHTML = icons.join('');
    e = document.getElementById('places');
    e.innerHTML = e.innerHTML + space + res.join(', ' + space);

}

var webService = new google.maps.StreetViewService();  
var checkaround = 100;
var panorama;

function pan() {
    webService.getPanoramaByLocation(map_center, checkaround, checkNearestStreetView);
}

function checkNearestStreetView(panoData){
    if(panoData){
         if(panoData.location){
            if(panoData.location.latLng){
              panorama = new google.maps.StreetViewPanorama(
                  document.getElementById('pictures'),
                  {
                    position: panoData.location.latLng,
                    pov: {heading: 165, pitch: 10}
                  });
            }
        }
    }
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
