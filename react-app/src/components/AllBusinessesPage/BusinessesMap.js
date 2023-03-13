import React, { useState } from 'react';
import Map, { Marker } from 'react-mapbox-gl';

const BusinessesMap = () => {
  const mapboxAccessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
  const [lng, setLng] = useState(54.37585762);
  const [lat, setLat] = useState(24.456776149);

  return (
      <Map
        mapboxAccessToken = {mapboxAccessToken}
        style={{
          width: "500px",
          height: "500px",
          borderRadius: "15px",
          border: "2px solid red"
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker
          longitude={lng}
          latitude={lat}
        />

      </Map>
  );
};

export default BusinessesMap;
