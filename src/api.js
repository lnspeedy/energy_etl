// ihm/src/api.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000',
});

export const getSourcesWithMetadata = async () => {
  const response = await apiClient.get('/sources_with_metadata');
  return response.data;
};

export const getDataForSource = async (sourceName, filters = {}) => {
  if (!sourceName) return [];

  // Construit les paramètres de requête dynamiquement
  const params = new URLSearchParams();
  for (const key in filters) {
    if (filters[key]) { // On ajoute seulement les filtres non-vides
      params.append(key, filters[key]);
    }
  }

  const response = await apiClient.get(`/data/${sourceName}`, { params });
  return response.data.data;
};