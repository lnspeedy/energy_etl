// ihm/src/App.js (Correction Finale et Nettoyage)
import React, { useState, useEffect } from 'react';
// CORRECTION : Nettoyage des imports inutilisés
import {
  ChakraProvider,
  Box,
  Container,
  Heading,
  Select,
  VStack,
  Spinner,
  Divider,
  Alert,
  AlertIcon,
  Input,
  InputGroup,
  InputLeftElement,
  Text // 'Text' est réutilisé
} from '@chakra-ui/react';
// CORRECTION : Nettoyage et utilisation de la bonne fonction API
import { getSourcesWithMetadata, getDataForSource } from './api';
import DataTable from './components/DataTable';
import MetadataCard from './components/MetadataCard';
import DataVisualizer from './components/DataVisualizer';
import FilterPanel from './components/FilterPanel';
import MapView from './components/MapView';

function App() {
  const [sources, setSources] = useState({});
  const [selectedSource, setSelectedSource] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({ q: '', pays: '', annee_debut: '', annee_fin: '' });

  // CORRECTION : La fonction pour charger les sources est maintenant complète.
  useEffect(() => {
    const fetchSources = async () => {
      try {
        const availableSources = await getSourcesWithMetadata();
        setSources(availableSources);
      } catch (err) {
        setError('Impossible de se connecter à l\'API. Assurez-vous que le serveur backend est lancé.');
      }
    };
    fetchSources();
  }, []);

  useEffect(() => {
    if (selectedSource) {
      const fetchData = async () => {
        setLoading(true);
        setError('');
        try {
          const sourceData = await getDataForSource(selectedSource, filters);
          setData(sourceData);
        } catch (err) {
          setError(`Erreur lors du chargement des données.`);
          setData([]);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    } else {
      setData([]);
    }
  }, [selectedSource, filters]);

  const sourceNames = Object.keys(sources);
  const currentSourceMetadata = sources[selectedSource];

  return (
    <ChakraProvider>
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Box textAlign="center">
            <Heading as="h1" size="2xl">Plateforme Avancée d'Analyse Énergétique</Heading>
          </Box>
          <Box bg="gray.50" p={6} borderRadius="lg" borderWidth="1px">
            <Heading size="md" mb={4}>Panneau de Contrôle</Heading>
            <Text mb={2} fontWeight="bold">1. Sélection de la Source</Text>
            <Select 
              placeholder={sourceNames.length > 0 ? "--- Choisissez un jeu de données à explorer ---" : "Chargement..."}
              value={selectedSource}
              onChange={(e) => {
                setSelectedSource(e.target.value);
                setFilters({}); 
                setData([]);
              }}
            >
              {sourceNames.map(source => <option key={source} value={source}>{sources[source]?.Nom_Source || source}</option>)}
            </Select>
          </Box>
          
          {selectedSource && (
            <>
              <Box>
                <Heading size="md" mb={2}>2. Filtrage et Recherche</Heading>
                <FilterPanel filters={filters} setFilters={setFilters} />
              </Box>
              <Divider my={4} />
              <Heading size="md" mb={-4}>3. Résultats de l'Exploration</Heading>
              {loading && <Spinner thickness="4px" speed="0.65s" color="blue.500" size="xl" alignSelf="center" my={10} />}
              {error && <Alert status="error"><AlertIcon />{error}</Alert>}
              {!loading && !error && (
                <>
                  <MetadataCard metadata={currentSourceMetadata} />
                  {selectedSource === 'global_power_plants' && <MapView data={data} />}
                  <DataVisualizer data={data} />
                  <DataTable data={data} sourceName={selectedSource} />
                </>
              )}
            </>
          )}
        </VStack>
      </Container>
    </ChakraProvider>
  );
}

export default App;
