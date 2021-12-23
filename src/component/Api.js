import axios from "axios";

const shoesApi = axios.create({
  baseURL: "https://61c47cb0f1af4a0017d995d5.mockapi.io/"
});

export default shoesApi