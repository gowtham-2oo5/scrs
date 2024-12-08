import axios from "axios";
import { getToken } from ".";
import { url } from ".";
const BASE_URL = `${url}/api/course-category`;

// Insert a single course category
export const insertCourseCategory = async (courseCategory) => {
  try {
    const res = await axios.post(`${BASE_URL}/insert-one`, courseCategory, {
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

// Bulk upload course categories via CSV
export const bulkUploadCourseCategories = async (csvFile) => {
  try {
    const formData = new FormData();
    formData.append("csv_file", csvFile);

    const res = await axios.post(`${BASE_URL}/bulk-upload`, formData, {
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

// Fetch all course categories
export const getAllCourseCategories = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/get-all`, {
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

// Delete a single course category by title
export const deleteCourseCategory = async (title) => {
  try {
    const res = await axios.delete(`${BASE_URL}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      params: { title },
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
