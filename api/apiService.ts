import axios from "axios";
import {
  API_URL_LOGIN,
  API_LOGIN_HEADER,
  API_URL_GETLASTNIK,
  API_URL_OBSTAJA_LOKACIJA,
  API_URL_NAZIVI,
  API_URL_POTRDILO,
} from "@env";

type LoginParams = {
  user: string;
  password: string;
};

type potrdiloParams = {
  stev: number;
  lokacija: number;
  stev_old: number;
  naziv: string;
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

export const checkLocation = async (location: number) => {
  try {
    const response = await axios.post(
      API_URL_OBSTAJA_LOKACIJA,
      {
        parameters: {
          stev: location,
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
    console.error("Check location error", error);
    throw error;
  }
};

export const getNazivi = async () => {
  try {
    const response = await axios.post(
      API_URL_NAZIVI,
      {},
      {
        headers: {
          Authorization: API_LOGIN_HEADER,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Get nazivi error", error);
    throw error;
  }
};

export const potrdilo = async ({
  stev,
  lokacija,
  stev_old,
  naziv,
}: potrdiloParams) => {
  try {
    const response = await axios.post(
      API_URL_POTRDILO,
      {
        parameters: {
          stev: stev,
          lokacija: lokacija,
          stev_old: stev_old,
          naziv: naziv,
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
    console.error("Potrdilo error", error);
    throw error;
  }
};
