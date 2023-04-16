map.on('load', () => {
    map.addLayer({
      id: 'acsim',
      type: 'circle',
      source: {
        type: 'geojson',
        data: './acsim.geojson'
      },
      paint: {
        'circle-radius': [
          'interpolate',
          ['linear'],
          ['number', ['get', 'crimes_cat']],
          0,
          4,
          5,
          24
        ],
        'circle-color': [
          'interpolate',
          ['linear'],
          ['number', ['get', 'crimes_cat']],
          0,
          '#2DC4B2',
          1,
          '#3BB3C3',
          2,
          '#669EC4',
          3,
          '#8B88B6',
          4,
          '#A2719B',
          5,
          '#AA5E79'
        ],
        'circle-opacity': 0.8
      }
    });
  });