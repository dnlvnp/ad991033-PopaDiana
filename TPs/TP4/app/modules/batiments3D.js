
map.on("load", function generate3D() {
    console.log('batiments3D')
    removeAllLayersAndSources()
    var grid = makeGrid()
    console.log(grid)
});

map.on("load", () => {
    map.addSource('batiments3D', {
        type: 'geojson',
        data: 'https://services6.arcgis.com/133a00biU9FItiqJ/arcgis/rest/services/batiments3D/FeatureServer/0/query?f=pgeojson&where=1=1&outFields=*',
    });
    map.addLayer({
        'id': 'batiments3D',
        'source': 'batiments',
        'type': 'fill-extrusion',
        'paint': {
            'fill-extrusion-color': [
                'match', ['get', 'g_type'],
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
                '#FFFFFF'
            ],
            'fill-extrusion-height': [
                'match', ['get', 'g_elevatio'],
                0, 20,
                20, 40,
                40, 60,
                60, 80,
                80, 100,
            ],
        }
    });
});


document
    .getElementById('generate3D')
    .addEventListener('click', generate3D);
