import axios from "axios";

/***Column CRUD API ***/
export const createCard = async (accessToken, title, columnId) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/cards?columnId=${columnId}`,
      {
        title: title,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.data.data && response.status === 201) {
      return response.data.data;
    }
  } catch (err) {
    console.log(err);
  }
};

export const fetchCards = async (accessToken, columnId) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/cards?columnId=${columnId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.data.data && response.status === 200) {
      return response.data.data;
    }
  } catch (err) {
    console.log(err);
  }
};

export const fetchCard = async (accessToken, cardId) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/cards/${cardId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.data.data && response.status === 200) {
      return response.data.data;
    }
  } catch (err) {
    console.log(err);
  }
};

export const updateCard = async (accessToken, data, cardId) => {
  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_API_URL}/cards/${cardId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.data.data && response.status === 201) {
      return response.data.data;
    }
  } catch (err) {
    console.log(err);
  }
};

export const deleteCard = async (accessToken, cardId) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/cards/${cardId}`,

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.data.data && response.status === 204) {
      toast.success(`Column deleted successfully! 🎆`);
    }
  } catch (err) {
    console.log(err);
  }
};

/***Card CRUD API ***/
