// création de la carte Mapbox GL
var map = new maplibregl.Map({
  container: 'map',
  style: 'https://api.maptiler.com/maps/streets/style.json?key=JhO9AmIPH59xnAn5GiSj', //Url de la carte
  center: [-73.6269, 45.5591], // position centrale de l'ile de Montreal
  zoom: 9, // niveau de zoom initial
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
      'source': 'casernes',
      'paint': {
        'fill-outline-color': '#432818',
        'fill-color': '#F0EFEB',
        'fill-opacity': 0.5,
      },
    });

//2. Unités d'évaluation foncière
map.addSource('batiments', {
  'type': 'geojson',
  'data': 'https://services6.arcgis.com/133a00biU9FItiqJ/arcgis/rest/services/batiments3D/FeatureServer/0/query?f=pgeojson&where=1=1&outFields=*',
}),

  map.addLayer({
    'id': 'batiments',
    'type': 'fill',
    'source': 'batiments',
    'paint': {
      'fill-color': [
        'match',
        ['get', 'g_type'],
        'RESIDENTIAL', '#E9ECEF',
        'EDUCATIONAL', '#343A40',
        'HOSPITAL','#ADB5BD',
        'HEALTH SERVICES','#b1a7a6',
        'RELIGIOUS', '#8e9aaf',
        'COURTHOUSE', '#E9ECEF',
        'CITY HALL', '#b1a7a6',
        'SHOPPING CENTER','#403d39',
        'COMMERCIAL','#4c5c68',
        'INDUSTRIAL','#343A40',
        'GREENHOUSE','#4c5c68',
        'LODGING FACILIT', '#E9ECEF',
        'STADIUM', '#4c5c68',
        'SPORTSPLEX', '#E9ECEF',
        'GAS STATION', '#343A40',
        'GAS AND OIL FAC','#4c5c68',
        'POLICE STATION', '#8e9aaf',
        'PENAL BUILDING','#ADB5BD',
        'FIRE STATION','#403d39',
        'LIBRARY','#4c5c68',
        'GRAIN ELEVATOR','#b1a7a6',
        'COMMUNITY CENTER','#343A40',
        'MUSEUM','#403d39',
        'MUNICIPAL','#8e9aaf',
        'GOLF COURSE', '#ADB5BD',
        'ARMOURY','#E9ECEF',
        'ARENA','#4c5c68',
        'BARN/MACHINER','#343A40',
        'ATTRACTION','#403d39',
        'OTHER', '#4c5c68',
        '#FFFFFF',
      ],
    }
  });

//3. Interventions du SIM dans les crimes
map.addSource('acsim', {
  'type': 'geojson',
  'data': 'https://services6.arcgis.com/133a00biU9FItiqJ/arcgis/rest/services/ac_sim/FeatureServer/0/query?f=pgeojson&where=1=1&outFields=*',
}),

  map.addLayer({
    'id': 'acsim',
    'type': 'circle',
    'source': 'acsim',
    'paint': {
      'circle-color': [
        'match',
        ['get', 'crimes_cat'],
        'Vols qualifiés', '#c89f9c',
        'Vol de véhicule à moteur', '#b23a48',
        'Vol dans / sur véhicule à moteur', '#8c2f39',
        'Introduction', '#fed0bb',
        'Méfait', '#461220',
        'Infractions entrainant la mort', '#000000',
        '#FFFFFF',
      ],
      'circle-radius': 7,
      "circle-stroke-width": 1.5,
      "circle-stroke-color": '#3f4238',
    }
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