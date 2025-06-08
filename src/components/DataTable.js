import React from 'react';
import {
  Box,
  Heading,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Alert,
  AlertIcon,
} from '@chakra-ui/react'; // Tout est importé d'ici
import { unparse } from 'papaparse';

const DataTable = ({ data, sourceName }) => {
  if (!sourceName) {
    return (
      <Alert status="info" mt={4} variant="subtle">
        <AlertIcon />
        Veuillez sélectionner une source de données dans le menu ci-dessus.
      </Alert>
    );
  }

  if (!data || data.length === 0) {
    return null;
  }

  const headers = Object.keys(data[0]);

  const handleDownload = () => {
    const csv = unparse(data, { header: true });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${sourceName}_data.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box mt={6}>
      <Heading as="h2" size="lg" mb={4}>
        Aperçu : <span style={{ color: '#3182CE' }}>{sourceName}</span> ({data.length} lignes)
      </Heading>
      <Button onClick={handleDownload} colorScheme="teal" mb={4}>
        Télécharger en CSV
      </Button>
      <TableContainer borderWidth="1px" borderRadius="lg" overflowX="auto" overflowY="auto" maxHeight="60vh">
        <Table variant="simple" size="sm">
          <Thead position="sticky" top={0} bg="gray.100" zIndex="docked">
            <Tr>{headers.map(header => <Th key={header}>{header}</Th>)}</Tr>
          </Thead>
          <Tbody>
            {data.map((row, rowIndex) => (
              <Tr key={rowIndex}>
                {headers.map(header => (
                  <Td key={`${rowIndex}-${header}`} whiteSpace="nowrap" maxW="300px" overflow="hidden" textOverflow="ellipsis" title={row[header]}>
                    {String(row[header])}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DataTable;