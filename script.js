// Mapbox

mapboxgl.accessToken = 'pk.eyJ1IjoiZGlub2RhbiIsImEiOiJjaWw5dGdsanMwMGVpdHVseHFmZjQ4MXQ0In0.UbS-xJ75RFFLkfewicoikg';
const map = new mapboxgl.Map({
container: 'map', // container id
style: 'mapbox://styles/dinodan/cl605lbbl005614ocxug4gxfs',
center: [-74.009, 40.673], // starting position
zoom: 14.26 // starting zoom
});

var marker = new mapboxgl.Marker();
var addButton = document.querySelector('.add-button');  
const form = document.querySelector('form');
var textarea = document.querySelector('textarea');

function add_marker (event) {
  var coordinates = event.lngLat;
  marker.setLngLat(coordinates).addTo(map);
  document.getElementById('lng').value = coordinates.lng
  document.getElementById('lat').value = coordinates.lat
}

function textCount(event) {
    var characterCount = textarea.value.length;
    var current = document.getElementById('current');
    var maximum = document.getElementById('maximum');
    var char_count = document.getElementById('char_count');
    current.textContent = characterCount;
}

function handleSubmit(event) {
    const data = new FormData(form);
    const value = Object.fromEntries(data.entries());

    //add new marker to map
    const el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = 'url(map-pin-svgrepo-com.svg)';
    el.style.width = '40px';
    el.style.height = '40px';
    new mapboxgl.Marker(el)
    .setLngLat([value.lng,value.lat])
    .addTo(map);
    //reset the form
    form.reset();
  }

textarea.addEventListener('input', textCount);
map.on('click', add_marker);
addButton.addEventListener('click', handleSubmit);