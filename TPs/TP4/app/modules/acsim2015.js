map.on("load", () => {
  //3. Interventions du SIM dans les crimes
  map.addSource('acsim', {
    'type': 'geojson',
    'data': 'https://services6.arcgis.com/133a00biU9FItiqJ/arcgis/rest/services/ac_sim2015/FeatureServer/0/query?f=pgeojson&where=1=1&outFields=*',
  }),

    map.addLayer({
      'id': 'acsim',
      'type': 'circle',
      'source': 'acsim',
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