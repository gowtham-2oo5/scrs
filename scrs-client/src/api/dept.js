import axios from "axios";
import { getToken } from ".";
import { url } from ".";

export const getDepts = async () => {
  try {
    const res = await axios.get(`${url}/api/dept/get-all`, {
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

export const addSingleDept = async (formData) => {
  try {
    const res = await axios.post(`${url}/api/dept/insert-one`, formData, {
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

export const bulkUploadDepts = async (file) => {
  try {
    const res = await axios.post(`${url}/api/dept/bulk-upload`, file, {
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

export const deleteDept = async (id) => {
  try {
    const res = await axios.delete(`${url}/api/dept?id=${id}`, {
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

export const setHodForDept = async (sn, hodId) => {
  try {
    const res = await axios.put(
      `${url}/api/dept/set-hod?sn=${sn}&hodId=${hodId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );

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
