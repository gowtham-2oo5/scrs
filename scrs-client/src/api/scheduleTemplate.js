import axios from "axios";
import { getToken } from ".";
import { url } from ".";

/**
 * Fetch all schedule templates.
 */
export const getAllTemplates = async () => {
  try {
    const res = await axios.get(`${url}/api/template`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return {
      data: res.data,
      status: res.status,
    };
  } catch (error) {
    return {
      data: null,
      error: error.response ? error.response.data : error.message,
    };
  }
};

/**
 * Fetch a schedule template by its ID.
 * @param {string} id - The UUID of the schedule template.
 */
export const getTemplateById = async (id) => {
  try {
    const res = await axios.get(`${url}/api/template/get-template`, {
      params: {
        id,
      },
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return {
      data: res.data,
      status: res.status,
    };
  } catch (error) {
    return {
      data: null,
      error: error.response ? error.response.data : error.message,
    };
  }
};

/**
 * Create a new schedule template.
 * @param {Object} tempDTO - The template data to create.
 */
export const createTemplate = async (tempDTO) => {
  try {
    const res = await axios.post(`${url}/api/template`, tempDTO, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    });
    return {
      data: res.data,
      status: res.status,
    };
  } catch (error) {
    return {
      data: null,
      error: error.response ? error.response.data : error.message,
    };
  }
};
