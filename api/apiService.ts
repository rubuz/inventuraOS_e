import axios from "axios";
import {
  EXPO_PUBLIC_API_URL_LOGIN,
  EXPO_PUBLIC_API_LOGIN_HEADER,
  EXPO_PUBLIC_API_URL_GETLASTNIK,
  EXPO_PUBLIC_API_URL_OBSTAJA_LOKACIJA,
  EXPO_PUBLIC_API_URL_NAZIVI,
  EXPO_PUBLIC_API_URL_POTRDILO,
  EXPO_PUBLIC_API_DB_USERNAME,
  EXPO_PUBLIC_API_DB_PASSWORD,
  EXPO_PUBLIC_API_DB_ROLE,
} from "@env";

type LoginParams = {
  user: string;
  password: string;
};

type potrdiloParams = {
  stev: number;
  lokacija: number;
  stev_old: number;
  naziv_inv: string;
};

export const login = async ({ user, password }: LoginParams) => {
  try {
    const response = await axios.post(
      EXPO_PUBLIC_API_URL_LOGIN,
      {
        parameters: {
          username: user,
          password: password,
        },
      },
      {
        headers: {
          Authorization: EXPO_PUBLIC_API_LOGIN_HEADER,
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
      EXPO_PUBLIC_API_URL_GETLASTNIK,
      {
        parameters: {
          stev: numberos,
        },
      },
      {
        headers: {
          Authorization: EXPO_PUBLIC_API_LOGIN_HEADER,
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
      EXPO_PUBLIC_API_URL_OBSTAJA_LOKACIJA,
      {
        parameters: {
          stev: location,
        },
      },
      {
        headers: {
          Authorization: EXPO_PUBLIC_API_LOGIN_HEADER,
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
      EXPO_PUBLIC_API_URL_NAZIVI,
      {
        connStr: {
          db_username: EXPO_PUBLIC_API_DB_USERNAME,
          db_password: EXPO_PUBLIC_API_DB_PASSWORD,
          db_ROLE: EXPO_PUBLIC_API_DB_ROLE,
          test: true,
        },
      },
      {
        headers: {
          Authorization: EXPO_PUBLIC_API_LOGIN_HEADER,
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
  naziv_inv,
}: potrdiloParams) => {
  try {
    const response = await axios.post(
      EXPO_PUBLIC_API_URL_POTRDILO,
      {
        parameters: {
          stev: stev,
          lokacija: lokacija,
          stev_old: stev_old,
          naziv_inv: naziv_inv,
        },
      },
      {
        headers: {
          Authorization: EXPO_PUBLIC_API_LOGIN_HEADER,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Potrdilo error", error);
    throw error;
  }
};
