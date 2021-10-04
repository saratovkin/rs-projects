function mapInit() {
  document.querySelector('.contacts-map').id = 'map';
  mapboxgl.accessToken = 'pk.eyJ1Ijoic2FyYXRvdmtpbiIsImEiOiJja3R5N3VnODAwNnVvMnBwYzNscmdkZ2lxIn0.5cLoaV00_oRJm_pRZJEp4A';
  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/saratovkin/ckty7xozu0qq117mpbxr6pnbx?optimize=true', // style URL
    center: [2.3364, 48.86091], // starting position [lng, lat]
    zoom: 15.5, // starting zoom
  });
}

document.addEventListener("DOMContentLoaded", mapInit);
