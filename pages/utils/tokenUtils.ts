export const getToken = async () => {
  try {
    const response = await fetch("/api/token/");
    if (!response.ok) {
      throw new Error("Failed to fetch access token");
    }
    const data = await response.json();
    return data.accessToken;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
