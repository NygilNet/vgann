mapboxgl.accessToken = 'pk.eyJ1IjoiYWRhbWJhenppMTQiLCJhIjoiY2xmNXYzZmZ5MDB3NDN3cG1uem10cDUybSJ9.kPfH2ptmpjVW3hKwf81GeQ'; // Replace with your Mapbox access token

fetch('/businesses')
    .then(response => response.json()['pins'])
    .then(data => {
        const mapContainer = document.createElement('div');
        mapContainer.setAttribute('id', 'map');
        mapContainer.style.width = '100%';
        mapContainer.style.height = '400px'; // Replace with your preferred height of the map container
        document.getElementById('map-container').appendChild(mapContainer);

        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11', // Replace with your preferred Mapbox style
            center: [-122.4376, 37.7577], // Replace with the default center of your map
            zoom: 12 // Replace with the default zoom level of your map
        });

        map.addSource('businesses', {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': data
            }
        });

        map.addLayer({
            'id': 'businesses',
            'type': 'symbol',
            'source': 'businesses',
            'layout': {
                'icon-image': 'default_marker', // Replace with the name of the marker image you want to use
                'icon-size': 0.5,
                'text-field': '{title}',
                'text-font': ['Open Sans Regular'],
                'text-size': 12,
                'text-offset': [0, 1.5]
            }
        });
    });
