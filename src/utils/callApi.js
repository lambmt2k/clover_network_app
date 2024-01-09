import axios from "axios";
import { BASE_URL, BASE_URL_V2, LOCAL_URL } from "../settings/apiConfig";


const callApi = (endpoint, method = 'GET', data = null, token = null) => {
  return axios({
    url: `${BASE_URL_V2}/${endpoint}`,
    method,
    
    data,
    headers: token ? {
      Authorization: `Bearer ${token}`
    } : null,
  });
};
export default callApi;
