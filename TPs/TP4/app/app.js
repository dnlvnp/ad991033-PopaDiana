// création de la carte Mapbox GL
var map = new maplibregl.Map({
  container: 'map',
  style: 'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL', //Url de la carte
    center: [-73.55, 45.55], // position centrale de l'ile de Montreal
    zoom: 9, // niveau de zoom initial
    hash: true // activation du hash pour la gestion de l'historique de la carte
});

    //Declaration de la variable geoJSON pour faciliter le fonctionnement des traitements qui vont suivre.
    //Par consequent, les fichiers geoJSON seront lisibles par les fonctions.
    var geoJSONcontent

    //Declaration de la variable qui permettra que les navigateurs puissent lire les fichiers.
    var reader = new FileReader(); 

    //Fonction declarant la variable que contiendra le fichier
    function handleFileSelect(evt) {
      var file = evt.target.files[0]; 
  
      var reader = new FileReader(); 
  
      reader.onload = function (theFile) {
  
          geoJSONcontent = JSON.parse(theFile.target.result);


//var scale = new maplibregl.ScaleControl({
//    maxWidth: 80,
//    unit: 'metric'
//    });
//    map.addControl(scale);
//     
//    scale.setUnit('metric');


          //Ajout des sources geoJSON
          map.addSource('geojson-source', {
              'type': 'geojson',
              'data': geoJSONcontent,

            }),

            map.addLayer({
              'id': 'acsim',
              'type': 'fill',
              'source': 'geojson-source'
          });

            map.addLayer({
              'id': 'casernes',
              'type': 'fill',
              'source': 'geojson-source'
          });

            map.addLayer({
              'id': 'uef',
              'type': 'fill',
              'source': 'geojson-source'
          });
      };

    }
    // Declaration de la fonction qui permettra de zoomer sur les fichiers geoJSON
    function zoomToGeoJSON () {
            map.fitBounds(geojsonExtent(geoJSONcontent));
    }

    
    document
        .getElementById('file')
        .addEventListener('change', handleFileSelect);


    //Initialisation de l'evenement qui a lieu lors du 'click' sur un bouton zoom
    document
        .getElementById('zoomto')
        .addEventListener('click', zoomToGeoJSON);