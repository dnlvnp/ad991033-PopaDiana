function acsim2022(){
    console.log('test')
    removeAllLayersAndSources()
  }
  
  map.on("load", () => {
    //Interventions du SIM dans les crimes : 2022
    map.addSource('acsim2022', {
      'type': 'geojson',
      'data': 'https://services6.arcgis.com/133a00biU9FItiqJ/arcgis/rest/services/acsim2022/FeatureServer/0/query?f=pgeojson&where=1=1&outFields=*',
    }),
  
      map.addLayer({
        'id': 'acsim2022',
        'type': 'circle',
        'source': 'acsim2022',
        'paint': {
          'circle-color': [
            'match',
            ['get', 'crimes_cat'],
            'Vols qualifiés', '#ffef9f',
            'Vol de véhicule à moteur', '#ffac81',
            'Vol dans / sur véhicule à moteur', '#b79ced',
            'Introduction', '#ffd6e0',
            'Méfait', '#99c1de',
            'Infractions entrainant la mort', '#ee6055',
            '#FFFFFF',
          ],
          'circle-radius': 7,
          "circle-stroke-width": 1.5,
          "circle-stroke-color": '#3f4238',
        }
      });
  });
  
  //Ajout d'un évènement pour relier le click à l'animation des données
  document
      .getElementById('acsim2022')
      .addEventListener('click', acsim2022);