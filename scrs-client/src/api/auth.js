import axios from "axios";
import { url } from ".";
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${url}/api/auth/login`, credentials);
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

export const verifyGivenOtp = async (otp) => {
  try {
    const response = await axios.post(`${url}/api/auth/verify-otp?otp=${otp}`);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    throw new Error(error.response?.data?.message || "OTP verification failed");
  }
};
