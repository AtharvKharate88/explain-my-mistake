export const authHeader = () => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) return {};

  return {
    Authorization: `Bearer ${accessToken}`,
  };
};
