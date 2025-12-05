import axios, { AxiosResponse } from "axios";
const PORT = process.env.next_public_be_url || "https://farael-backend.esp.ovh";

const API_PORT = `${PORT}`;

export const createApi = () => {
  // const token = localStorage.getItem("token");

  return axios.create({
    baseURL: API_PORT,
    headers: {
      // Authorization: `Bearer ${token}`,
    },
  });
};

interface AxiosMutationParams<T> {
  path: string;
  data: T;
  method?: "post" | "put";
}

export const AxiosMutation = async <T>({
  path,
  data,
  method = "post",
}: AxiosMutationParams<T>): Promise<AxiosResponse> => {
  const axios = createApi();
  return axios[method](path, data);
};

export const AxiosQuery = async (path: string): Promise<AxiosResponse> => {
  const axios = createApi();
  return await axios.get(path);
};
