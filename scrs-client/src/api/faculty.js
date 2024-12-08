import axios from "axios";
import { getToken } from ".";
import { url } from ".";

export const getAllFaculties = async () => {
  try {
    const res = await axios.get(`${url}/api/faculty`, {
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

export const getFacultiesByDept = async (deptName) => {
  try {
    const res = await axios.get(`${url}/api/faculty/get-by-dept`, {
      params: {
        sn: deptName,
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

export const getFacultyById = async (id) => {
  try {
    const res = await axios.get(`${url}/api/faculty/get-by-id?empId=${id}`, {
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

export const createNewFaculty = async (formData) => {
  try {
    const res = await axios.post(`${url}/api/faculty/create`, formData, {
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
