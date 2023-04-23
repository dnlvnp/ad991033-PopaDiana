// création de la carte Mapbox GL
var map = new maplibregl.Map({
  container: 'map',
  style: 'https://api.maptiler.com/maps/streets/style.json?key=JhO9AmIPH59xnAn5GiSj', //Url de la carte
  center: [-73.6269, 45.5591], // position centrale de l'ile de Montreal
  zoom: 9.5, // niveau de zoom initial
  hash: true // activation du hash pour la gestion de l'historique de la carte
});

// Ajout du contrôle d'échelle dynamique
var scale = new maplibregl.ScaleControl({
  unit: 'metric' // Unité: métrique
});
map.addControl(scale, 'bottom-left'); //Position : bas-gauche

//Ajout des contrôles de zoom
var nav = new maplibregl.NavigationControl({
  showCompass: true, //Boussole
  showZoom: true, //Boutons de zoom
  visualizePitch: true //Angle d'inclinaison (surtout pertinent pour les bâtiments 2.5D)
});
map.addControl(nav, 'bottom-left'); //Position : bas-gauche

map.on("load", () => {

  //Ajout des couches WFS
  //1.  Territoires administratifs des casernes de Montréal
  map.addSource('casernes', {
    'type': 'geojson',
    'data': 'https://services6.arcgis.com/133a00biU9FItiqJ/arcgis/rest/services/territoires_administratifs_casernes/FeatureServer/0/query?f=pgeojson&where=1=1&outFields=*',
  }),

    map.addLayer({
      'id': 'casernes',
      'type': 'fill',
      'source': 'casernes'
    });

  //2. Unités d'évaluation foncière
  map.addSource('batiments', {
    'type': 'geojson',
    'data': 'https://services6.arcgis.com/133a00biU9FItiqJ/arcgis/rest/services/batiments3D/FeatureServer/0/query?f=pgeojson&where=1=1&outFields=*',
  }),

    map.addLayer({
      'id': 'batiments',
      'type': 'fill',
      'source': 'batiments'
    });

  //3. Interventions du SIM dans les crimes
  map.addSource('acsim', {
    'type': 'geojson',
    'data': 'https://services6.arcgis.com/133a00biU9FItiqJ/arcgis/rest/services/ac_sim/FeatureServer/0/query?f=pgeojson&where=1=1&outFields=*',
  }),

    map.addLayer({
      'id': 'acsim',
      'type': 'circle',
      'source': 'acsim'
    });
});

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