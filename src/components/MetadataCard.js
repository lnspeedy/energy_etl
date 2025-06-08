// ihm/src/components/MetadataCard.js
import React from 'react';
import { Box, Card, CardHeader, CardBody, Heading, Stack, StackDivider, Text } from '@chakra-ui/react';

const MetadataCard = ({ metadata }) => {
  if (!metadata || Object.keys(metadata).length === 0) {
    return null;
  }

  // Fonction pour créer une ligne de métadonnée
  const MetadataRow = ({ label, value }) => (
    <Box>
      <Heading size='xs' textTransform='uppercase'>{label}</Heading>
      <Text pt='2' fontSize='sm'>
        {/* Si la valeur est un lien, on la rend cliquable */}
        {String(value).startsWith('http') ? 
          <a href={value} target="_blank" rel="noopener noreferrer" style={{ color: '#3182CE', textDecoration: 'underline' }}>{value}</a> : 
          value}
      </Text>
    </Box>
  );

  return (
    <Card variant="outline">
      <CardHeader>
        <Heading size='md'>Catalogue de Données</Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing='4'>
          <MetadataRow label="Nom du Jeu de Données" value={metadata.Nom_Jeu_Donnees} />
          <MetadataRow label="Description" value={metadata.Description} />
          <MetadataRow label="Producteur" value={metadata.Producteur} />
          <MetadataRow label="Unités" value={metadata.Unites} />
          <MetadataRow label="Couverture Temporelle" value={metadata.Couverture_Temporelle} />
          <MetadataRow label="Fréquence de Mise à Jour" value={metadata.Frequence_Maj} />
          <MetadataRow label="Lien d'accès direct" value={metadata.Lien_Acces} />
        </Stack>
      </CardBody>
    </Card>
  );
};

export default MetadataCard;