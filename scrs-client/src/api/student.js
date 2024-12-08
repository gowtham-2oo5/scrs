import axios from "axios";
import { getToken } from ".";
import { url } from ".";

export const createStudent = async (formData) => {
  try {
    const res = await axios.post(`${url}/api/student/create`, formData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "multipart/form-data",
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
