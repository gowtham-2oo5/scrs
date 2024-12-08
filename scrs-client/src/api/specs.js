import axios from "axios";
import { getToken } from ".";
import { url } from ".";

export const getAllSpecs = async () => {
  try {
    const res = await axios.get(`${url}/api/spec/get-all`, {
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

export const addSingleSpec = async (formData) => {
  try {
    const res = await axios.post(`${url}/api/spec/insert-one`, formData, {
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

export const bulkUploadSpecs = async (file) => {
  try {
    const res = await axios.post(`${url}/api/spec/bulk-upload`, file, {
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

export const deleteSpec = async (id) => {
  try {
    const res = await axios.delete(`${url}/api/spec/delete/${id}`, {
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

export const updateSpecDept = async (sn, deptSn) => {
  try {
    console.log("Received sn and deptSn:", sn, deptSn);
    const res = await axios.put(
      `${url}/api/spec/update/${sn}?deptSn=${deptSn}`,
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

export const getSpecBySn = async (sn) => {
  try {
    const res = await axios.get(`${url}/api/spec/get/${sn}`, {
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
