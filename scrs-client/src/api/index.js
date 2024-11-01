import axios from "axios";

const backendUrl = "http://localhost:8080";
console.log(backendUrl);

export default async function getUsers() {
  return axios.get(backendUrl + "/user/get-all");
}

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${backendUrl}/auth/login`, credentials);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    if (error.response) {
      return {
        data: error.response.data,
        status: error.response.status,
      };
    } else {
      throw error;
    }
  }
};

export const createAdmin = async (formData) => {
  try {
    const response = await axios.post(`${backendUrl}/admin/create`, formData, {
      headers: {
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

export const verifyGivenOtp = async (otp) => {
  try {
    const response = await axios.post(`${backendUrl}/auth/verify-otp`, { otp });
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    throw new Error(error.response?.data?.message || "OTP verification failed");
  }
};

export const createStudent = async (formData) => {
  try {
    const res = await axios.post(`${backendUrl}/student/create`, formData, {
      headers: {
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
