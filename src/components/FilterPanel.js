// ihm/src/components/FilterPanel.js (Nettoyé)
import React from 'react';
// CORRECTION : 'Button' a été retiré car il n'était pas utilisé.
import { Box, FormControl, FormLabel, Input, SimpleGrid } from '@chakra-ui/react';

const FilterPanel = ({ filters, setFilters }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  return (
    <Box bg="gray.50" p={6} borderRadius="lg" borderWidth="1px">
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
        <FormControl>
          <FormLabel>Recherche Texte</FormLabel>
          <Input name="q" placeholder="ex: Perovskite, France..." value={filters.q || ''} onChange={handleInputChange} bg="white" />
        </FormControl>
        <FormControl>
          <FormLabel>Pays</FormLabel>
          <Input name="pays" placeholder="ex: Germany" value={filters.pays || ''} onChange={handleInputChange} bg="white" />
        </FormControl>
        <FormControl>
          <FormLabel>Année Début</FormLabel>
          <Input name="annee_debut" type="number" placeholder="ex: 2020" value={filters.annee_debut || ''} onChange={handleInputChange} bg="white" />
        </FormControl>
      </SimpleGrid>
    </Box>
  );
};

export default FilterPanel;