// création de la carte Mapbox GL
var map = new maplibregl.Map({
  container: 'map',
  style: 'https://api.maptiler.com/maps/streets/style.json?key=JhO9AmIPH59xnAn5GiSj', //Url de la carte
  center: [-73.7785, 45.5733], // position centrale de l'ile de Montreal
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

//Déclaration des couches 
const myLayers = ['batiments3D','casernesH3', 'casernes','acsim2015','acsim2016','acsim2017','acsim2018','acsim2019','acsim2020','acsim2021','acsim2022','acsim2023']

// Cette fonction est appelée lorsque la carte est chargée.
map.on('load', function () {
  // Ajout de la légende : position bas-droite.
  map.addControl(new MaplibreLegendControl({
    batiments3D: 'Unités évaluation foncière',
    casernesH3: 'Territoires des casernes (index H3)',
    casernes: 'Territoires des casernes',
    acsim2015: 'Interventions SIM (2015)',
    acsim2016: 'Interventions SIM (2016)',
    acsim2017: 'Interventions SIM (2017)',
    acsim2018: 'Interventions SIM (2018)',
    acsim2019: 'Interventions SIM (2019)',
    acsim2020: 'Interventions SIM (2020)',
    acsim2021: 'Interventions SIM (2021)',
    acsim2022: 'Interventions SIM (2022)',
    acsim2023: 'Interventions SIM (2023)',
  }, { onlyRendered: true }), "bottom-right");
});

map.on("load", () => {
  //Ajout des couches WFS
  //1.  Territoires administratifs des casernes de Montréal (index H3)
  map.addSource('casernesH3', {
    'type': 'geojson',
    'data': 'https://services6.arcgis.com/133a00biU9FItiqJ/arcgis/rest/services/casernes_indexh3/FeatureServer/0/query?f=pgeojson&where=1=1&outFields=*',
  }),

    map.addLayer({
      'id': 'casernesH3',
      'type': 'fill',
      'source': 'casernesH3',
      'paint': {
        'fill-outline-color': '#432818',
        'fill-color': [
          'match',
          ['get', 'nom_arrond'],
          'Saint-Laurent', '#d9dfcc',
          'Rivière-des-Prairies-Pointe-aux-Trembles', '#3a3500',
          'Ahuntsic-Cartierville', '#6a4b41',
          'Mercier-Hochelaga-Maisonneuve', '#544c46',
          'Côte-des-Neiges-Notre-Dame-de-Grâce', '#4c3c44',
          'Pierrefonds-Roxboro', '#806472',
          'Rosemont-La Petite-Patrie', '#806364',
          'Villeray-Saint-Michel-Parc-Extension', '#b1ba9b',
          'LaSalle', '#cbbeb5',
          'Ville-Marie', '#c39797',
          'Le Sud-Ouest', '#516458',
          'Saint-Léonard', '#bcc499',
          'Anjou', '#eaa28b',
          'Lachine', '#a85d45',
          'Montréal-Nord', '#e5cfb8',
          'Verdun', '#fff2cc',
          'Le Plateau-Mont-Royal', '#5e605d',
          "L'Île-Bizard-Sainte-Geneviève", '#b8dbd3',
          'Outremont','#f2f6c3',
          '#f7e7b4',
        ],
        'fill-opacity': 0.5,
      },
    });

  //2.  Territoires administratifs des casernes de Montréal (découpage original)
  map.addSource('casernes', {
    type: 'vector',
    tiles: 'https://vectortileservices6.arcgis.com/133a00biU9FItiqJ/arcgis/rest/services/territoires_administratifs_casernes/VectorTileServer',
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

  //3. Unités d'évaluation foncière
  //J'ai décidé de conserver la couche 2D considérant que je n'ai pas réussi à générer le 2.5D
  map.addSource('batiments3D', {
    'type': 'geojson',
    'data': 'https://services6.arcgis.com/133a00biU9FItiqJ/arcgis/rest/services/batiments3D/FeatureServer/0/query?f=pgeojson&where=1=1&outFields=*',
  }),

    map.addLayer({
      'id': 'batiments3D',
      'type': 'fill',
      'source': 'batiments3D',
      'paint': {
        'fill-color': [
          'match',
          ['get', 'g_type'],
          'RESIDENTIAL', '#E9ECEF',
          'EDUCATIONAL', '#343A40',
          'HOSPITAL', '#ADB5BD',
          'HEALTH SERVICES', '#b1a7a6',
          'RELIGIOUS', '#8e9aaf',
          'COURTHOUSE', '#E9ECEF',
          'CITY HALL', '#b1a7a6',
          'SHOPPING CENTER', '#403d39',
          'COMMERCIAL', '#4c5c68',
          'INDUSTRIAL', '#343A40',
          'GREENHOUSE', '#4c5c68',
          'LODGING FACILIT', '#E9ECEF',
          'STADIUM', '#4c5c68',
          'SPORTSPLEX', '#E9ECEF',
          'GAS STATION', '#343A40',
          'GAS AND OIL FAC', '#4c5c68',
          'POLICE STATION', '#8e9aaf',
          'PENAL BUILDING', '#ADB5BD',
          'FIRE STATION', '#403d39',
          'LIBRARY', '#4c5c68',
          'GRAIN ELEVATOR', '#b1a7a6',
          'COMMUNITY CENTER', '#343A40',
          'MUSEUM', '#403d39',
          'MUNICIPAL', '#8e9aaf',
          'GOLF COURSE', '#ADB5BD',
          'ARMOURY', '#E9ECEF',
          'ARENA', '#4c5c68',
          'BARN/MACHINER', '#343A40',
          'ATTRACTION', '#403d39',
          'OTHER', '#4c5c68',
          '#FFFFFF',
        ],
        'fill-opacity': 0.8,
        'fill-outline-color': '#000000',
      }
    });
});