import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const generateBrand = async (brandData) => {
  const response = await axios.post(`${API_URL}/generate-brand`, brandData);
  return response.data;
};

export const saveBrand = async (saveData) => {
  const response = await axios.post(`${API_URL}/save-brand`, saveData);
  return response.data;
};

export const getBrands = async () => {
  const response = await axios.get(`${API_URL}/brands`);
  return response.data;
};
