import axios from "axios";

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    throw new Error("No refresh token");
  }

  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/refresh`,
    { refreshToken }
  );

  localStorage.setItem("accessToken", res.data.accessToken);
  return res.data.accessToken;
};
