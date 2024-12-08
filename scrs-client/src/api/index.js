import { getSessionItem } from "@/utils/sessionStorageManager";

// Utility function to get the token
export const getToken = () => {
  // console.log("CALLED GET TOKEN");
  return getSessionItem("token");
};

export const url = "https://scrs-server-production.up.railway.app";
