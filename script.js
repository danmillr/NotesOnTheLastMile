const MapBoxToken = config.MAPBOX_TOKEN

// Mapbox

mapboxgl.accessToken = MapBoxToken;
const map = new mapboxgl.Map({
container: 'map', // container id
style: 'mapbox://styles/dinodan/cl6pd3qoh005h14mlf4gkz5g0',
center: [-74.009, 40.673], // starting position
zoom: 14.26 // starting zoom
});


// Vars
var mapEditButton = document.querySelector('.toggle-edit-map')
var addButton = document.querySelector('.add-button');  
var infoButton = document.querySelector('#info-button');
var infoIcon = document.querySelector("#info-icon-container");
const form = document.querySelector('form');
const formContainer = document.querySelector('#form-container');
var textarea = document.querySelector('textarea');
var mediaInput = document.querySelector('#mediaUpload');
let imageResult;
var marker = new mapboxgl.Marker({ color: 'grey'});
let mapEdit = false;
let infoView = true;
const infoContainer = document.querySelector('#info-container')

let annotations = {
  "annotationList": []
};

// Functions
function pageLoadFn(event){
  if(localStorage.getItem('annotations') === null){
    return
  } else {
    annotations = JSON.parse(localStorage.getItem('annotations'))
    annotations.annotationList.forEach(loadMarkers)
  }
}

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
  event.preventDefault();

    var input_marker = new mapboxgl
      .Marker({ color: 'blue'});

    const data = new FormData(form);
    const value = Object.fromEntries(data.entries());

    mapAnnotation = {
      lat: value.lat,
      lng: value.lng,
      annotation: value.annotation,
      image: imageResult
    }

  // add the annotation object to the array
  annotations.annotationList.push(mapAnnotation);
  // store the tweets in local storage
  localStorage.setItem('annotations', JSON.stringify(annotations))

    input_marker
      .setLngLat([value.lng,value.lat])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 })
          .setHTML(
            `<p>${mapAnnotation.annotation}</p><img src="${mapAnnotation.image}">`
          )
      )
      .addTo(map);

    //reset the form
    form.reset();
}

function loadMarkers (input) {
  var input_marker = new mapboxgl
      .Marker({ color: 'blue'});
  
  input_marker
    .setLngLat([input.lng,input.lat])
    .setPopup(
      new mapboxgl.Popup({ offset: 25 })
        .setHTML(
          `<p>${input.annotation}</p><img src="${input.image}">`
        )
    )
    .addTo(map);
}

function toggleMapEdit (event) {
  if (mapEdit == false) {
    mapEdit = true;
    formContainer.classList.remove('hide')
    formContainer.classList.add('form-container-display')
    mapEditButton.classList.add('rotate');

  } else if (mapEdit == true) {
    mapEdit = false;
    formContainer.classList.remove('form-container-display')
    formContainer.classList.add('hide')
    mapEditButton.classList.remove('rotate');

    //Clear marker
    marker.remove();
  }
}

function toggleInfoView (event) {
  console.log('toggle')
  if (infoView == false) {
    infoView = true;
    infoContainer.classList.remove('hide')
    infoIcon.classList.remove('info-icon')
    infoIcon.classList.add('close-icon')

  } else if (infoView == true) {
    infoView = false;
    infoIcon.classList.remove('close-icon')
    infoIcon.classList.add('info-icon')
    infoContainer.classList.add('hide')
  }
}

function handleImage(input) {
  var reader;

  if(input.files && input.files[0]){
      reader = new FileReader();

      reader.onload = function(event){
          
          imageResult = event.target.result
          console.log(imageResult)
          return imageResult
      }
      reader.readAsDataURL(input.files[0]);
  }
  console.log(input.files)
}

// Events
window.addEventListener('load', pageLoadFn)
textarea.addEventListener('input', textCount);
map.on('click', add_marker);
addButton.addEventListener('click', handleSubmit);
mapEditButton.addEventListener('click', toggleMapEdit);
mediaInput.addEventListener("change", function() {
  handleImage(this);
});
infoButton.addEventListener('click', toggleInfoView);