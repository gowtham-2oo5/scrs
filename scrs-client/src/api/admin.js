import axios from "axios";
import { getToken } from ".";
import { url } from ".";

export const createAdmin = async (formData) => {
  try {
    const response = await axios.post(`${url}/api/admin/create`, formData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
