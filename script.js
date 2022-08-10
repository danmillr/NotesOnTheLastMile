const MapBoxToken = config.MAPBOX_TOKEN

// Mapbox

mapboxgl.accessToken = MapBoxToken;
const map = new mapboxgl.Map({
container: 'map', // container id
style: 'mapbox://styles/dinodan/cl605lbbl005614ocxug4gxfs',
center: [-74.009, 40.673], // starting position
zoom: 14.26 // starting zoom
});


// Vars
let result;
var mapEditButton = document.querySelector('.toggle-edit-map')
var addButton = document.querySelector('.add-button');  
const form = document.querySelector('form');
const formContainer = document.querySelector('#form-container');
var textarea = document.querySelector('textarea');
var marker = new mapboxgl.Marker({ color: 'grey'});
let mapEdit = false;

// Functions
function add_marker (event) {
  if (mapEdit == true){
    var coordinates = event.lngLat;

    marker.setLngLat(coordinates).addTo(map);
  
    document.getElementById('lng').value = coordinates.lng
    document.getElementById('lat').value = coordinates.lat
  } else {
    return
  };
}

function textCount(event) {
    var characterCount = textarea.value.length;
    var current = document.getElementById('current');
    var maximum = document.getElementById('maximum');
    var char_count = document.getElementById('char_count');
    current.textContent = characterCount;
}

function handleSubmit (event) {
    var input_marker = new mapboxgl
      .Marker({ color: 'black'});
   
    const data = new FormData(form);
    const value = Object.fromEntries(data.entries());
    console.log(data)
    console.log(value)

    input_marker
      .setLngLat([value.lng,value.lat])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 })
          .setHTML(
            `<p>${value.annotation}</p>`
          )
      )
      .addTo(map);

    //reset the form
    form.reset();
}

function toggleMapEdit (event) {
  if (mapEdit == false) {
    mapEdit = true;
    formContainer.classList.remove('hide')
    formContainer.classList.add('form-container-display')

  } else if (mapEdit == true) {
    mapEdit = false;
    formContainer.classList.remove('form-container-display')
    formContainer.classList.add('hide')

    //Clear marker
    marker.remove();
  }
}

// Events
textarea.addEventListener('input', textCount);
map.on('click', add_marker);
addButton.addEventListener('click', handleSubmit);
mapEditButton.addEventListener('click', toggleMapEdit);