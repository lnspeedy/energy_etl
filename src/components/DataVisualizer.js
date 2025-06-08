// ihm/src/components/DataVisualizer.js
import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DataVisualizer = ({ data }) => {
  if (!data || data.length === 0) {
    return null;
  }

  // Tentative de détection automatique des champs pour les graphiques
  const dateField = ['date', 'event_datetime', 'annee'].find(field => data[0][field]);
  const valueField = ['valeur', 'valeur_mw', 'generation_mwh', 'capacite_mw', 'cloture', 'part_renouvelable_hors_hydro_pct'].find(field => data[0][field]);
  const categoryField = ['pays', 'nom_centrale', 'type_energie', 'generation_type', 'nom_politique', 'nom_entreprise'].find(field => data[0][field]);

  if (dateField && valueField) {
    // Si on a une date et une valeur, on fait un graphique en lignes
    return (
      <Box mt={10} height="400px">
        <Heading size="lg" mb={4}>Visualisation Temporelle</Heading>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={dateField} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={valueField} stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    );
  } else if (categoryField && valueField) {
    // Si on a une catégorie et une valeur, on fait un graphique en barres (top 15)
    const topData = data.slice(0, 15);
    return (
      <Box mt={10} height="400px">
        <Heading size="lg" mb={4}>Comparaison par Catégorie</Heading>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={topData} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis type="category" dataKey={categoryField} width={150} />
            <Tooltip />
            <Legend />
            <Bar dataKey={valueField} fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    );
  }

  return <Text mt={6}>Pas de visualisation automatique disponible pour ce jeu de données.</Text>;
};

export default DataVisualizer;