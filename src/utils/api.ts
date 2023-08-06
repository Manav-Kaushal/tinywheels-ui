import { create } from "apisauce";
import { appConfig } from "./config";

// define the api
const api = create({
  baseURL: appConfig.apiBaseUrl,
  headers: {},
});

export default api;
