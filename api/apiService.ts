import axios from "axios";
import { API_URL_LOGIN, API_LOGIN_HEADER, API_URL_GETLASTNIK } from "@env";

type LoginParams = {
  user: string;
  password: string;
};

export const login = async ({ user, password }: LoginParams) => {
  try {
    const response = await axios.post(
      API_URL_LOGIN,
      {
        parameters: {
          username: user,
          password: password,
        },
      },
      {
        headers: {
          Authorization: API_LOGIN_HEADER,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Login error", error);
    throw error; // Rethrow to handle it in the component
  }
};

export const getOSinfo = async (numberos: number) => {
  try {
    const response = await axios.post(
      API_URL_GETLASTNIK,
      {
        parameters: {
          stev: numberos,
        },
      },
      {
        headers: {
          Authorization: API_LOGIN_HEADER,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Get OS info error", error);
    throw error; // Rethrow to handle it in the component
  }
};
