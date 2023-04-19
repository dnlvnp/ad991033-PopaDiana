// création de la carte Mapbox GL
var map = new maplibregl.Map({
  container: 'map',
  style: 'https://api.maptiler.com/maps/streets/style.json?key=JhO9AmIPH59xnAn5GiSj', //Url de la carte
  center: [-73.55, 45.55], // position centrale de l'ile de Montreal
  zoom: 9, // niveau de zoom initial
  hash: true // activation du hash pour la gestion de l'historique de la carte
});

//Declaration de la variable geoJSON pour faciliter le fonctionnement des traitements qui vont suivre.
//Par consequent, les fichiers geoJSON seront lisibles par les fonctions.
//var geoJSONcontent

//Declaration de la variable qui permettra que les navigateurs puissent lire les fichiers.
var reader = new FileReader();

//Fonction declarant la variable que contiendra le fichier
function handleFileSelect(evt) {
  var file = evt.target.files[0];

  reader.onload = function (theFile) {

    //geoJSONcontent = JSON.parse(theFile.target.result);


    var scale = new maplibregl.ScaleControl({
      maxWidth: 80,
      unit: 'metric'
    });
    map.addControl(scale);

    scale.setUnit('metric');


    //Ajout des sources geoJSON
    //map.addSource('acsim', {
    // 'type': 'geojson',
    //  'data' : 'https://services6.arcgis.com/133a00biU9FItiqJ/arcgis/rest/services/ac_sim/FeatureServer/0/query?f=pgeojson&where=1=1&outFields=*',
    //}),

    //  map.addLayer({
    //    'id': 'acsim',
    //    'type': 'circle',
    //    'source': 'acsim-source'
    // });
  };

  reader.readAsText(file, 'UTF-8');
}
// Declaration de la fonction qui permettra de zoomer sur les fichiers geoJSON
function zoomToGeoJSON() {
  map.fitBounds(geojsonExtent(geoJSONcontent));
}


//document
//.getElementById('file')
//.addEventListener('change', handleFileSelect);


//Initialisation de l'evenement qui a lieu lors du 'click' sur un bouton zoom
document
  .getElementById('zoomto')
  .addEventListener('click', zoomToGeoJSON);