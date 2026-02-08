import axios from 'axios';

const FORM_API_URL = import.meta.env.VITE_FORM_URL || '';
const COMPANY_ID = import.meta.env.VITE_FORM_COMPANY_ID || '';

/**
 * Fetch job positions from the job form API
 * @returns {Promise} API response with job positions data
 */
export const fetchJobPositions = async () => {
  try {
    const response = await axios.get(`${FORM_API_URL}/public/jobs/company/Valora`);
    return response.data;
  } catch (error) {
    console.error('Error fetching job positions:', error);
    throw error;
  }
};

/**
 * Get a single job position by ID
 * @param {string} positionId - The job position ID
 * @returns {Promise} API response with job position details
 */
export const fetchJobPositionById = async (positionId) => {
  try {
    const response = await axios.get(`${FORM_API_URL}/public/jobs/company/Valora/${positionId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching job position details:', error);
    throw error;
  }
};
