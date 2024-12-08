import axios from "axios";
import { getToken } from ".";
import { url } from ".";

export const getAllBatches = async () => {
  try {
    const res = await axios.get(`${url}/api/batch/get-all`, {
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

export const addSingleBatch = async (formData) => {
  try {
    const res = await axios.post(`${url}/api/batch/insert-one`, formData, {
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

export const bulkUploadBatches = async (file) => {
  try {
    const res = await axios.post(`${url}/api/batch/bulk-upload`, file, {
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

export const deleteAllBatches = async () => {
  try {
    const res = await axios.delete(`${url}/api/batch/del-all`, {
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

export const deleteBatchById = async (id) => {
  try {
    const res = await axios.delete(`${url}/api/batch?id=${id}`, {
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

export const updateBatchSem = async (batchName) => {
  try {
    const res = await axios.put(
      `${url}/api/batch/update-sems/${batchName}`,
      null,
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
