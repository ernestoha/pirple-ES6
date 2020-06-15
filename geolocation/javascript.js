/**
 * The W3C Geolocation API
 */

var app = {};

app.initJs = function(){
  app.bindClick();
}

app.bindClick = function (){
  const btnLoc = document.getElementById("btnLoc");
  btnLoc.addEventListener("click", app.getGeoLocation);
}

app.getGeoLocation = function (e){
  e.preventDefault();
  console.log(navigator.geolocation);
  app.geoFindMe();
}

app.geoFindMe = function () {
  const status = document.querySelector('#status');
  const mapLink = document.querySelector('#map-link');

  mapLink.href = '';
  mapLink.textContent = '';

  function success(position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    
    status.textContent = '';
    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
  }

  function error() {
    status.textContent = 'Unable to retrieve your location';
  }

  if(!navigator.geolocation) {
    status.textContent = 'Geolocation is not supported by your browser';
  } else {
    status.textContent = 'Locating…';
    navigator.geolocation.getCurrentPosition(success, error);
  }

}

window.addEventListener('DOMContentLoaded', app.initJs);