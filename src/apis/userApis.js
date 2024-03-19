import axios from "axios";

export const fetchUserProfile = async (accessToken) => {
  if (accessToken === undefined) return null;

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/users/me`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const updateUserProfile = async (accessToken, formState) => {
  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_API_URL}/users/me`,
      formState,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data.data;
  } catch (e) {
    console.log(e);
  }
};
