// ihm/src/components/MapView.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Box, Heading } from '@chakra-ui/react';

const MapView = ({ data }) => {
  // On ne montre la carte que si les données contiennent latitude et longitude
  if (!data || data.length === 0 || !data[0].latitude || !data[0].longitude) {
    return null;
  }

  // Filtrer les points qui ont des coordonnées valides
  const validPoints = data.filter(d => typeof d.latitude === 'number' && typeof d.longitude === 'number');
  
  if (validPoints.length === 0) return null;

  // Centrer la carte sur le premier point
  const centerPosition = [validPoints[0].latitude, validPoints[0].longitude];

  return (
    <Box mt={8} height="500px" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Heading size="lg" p={4}>Carte des Centrales Électriques</Heading>
      <MapContainer center={centerPosition} zoom={4} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {validPoints.map((point, index) => (
          <Marker key={index} position={[point.latitude, point.longitude]}>
            <Popup>
              <b>{point.nom_centrale}</b><br />
              Pays: {point.pays}<br />
              Capacité: {point.capacite_mw} MW<br />
              Source: {point.source_primaire}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  );
};

export default MapView;