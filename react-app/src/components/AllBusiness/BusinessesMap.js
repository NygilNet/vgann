import React, { useRef, useEffect, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

export default function BusinessesMap() {
  const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);

 useEffect(() => {
      if (map.current) return; // initialize map only once
      map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
      });
    });

  return (
      <div style={{ width: '100%', height: '500px' }}>
        <div ref={mapContainer} className="map-container" style={{ width: '100%', height: '100%' }} />
      </div>
        );
}




// import React, { useState } from 'react';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import Map, { Marker } from 'react-mapbox-gl';

// const BusinessesMap = () => {
//   const mapboxAccessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
//   const [lng, setLng] = useState(54.37);
//   const [lat, setLat] = useState(24.45);

//   return (
//     <div>
//       <Map
//         mapboxAccessToken = {mapboxAccessToken}
//         style={{
//           width: "500px",
//           height: "500px",
//           borderRadius: "15px",
//           border: "2px solid red"
//         }}
//         mapStyle="mapbox://styles/mapbox/streets-v12"
//       >
//       <Marker
//         longitude={lng}
//         latitude={lat}
//       />

//       </Map>

//     </div>
//   );
// };

// export default BusinessesMap;
