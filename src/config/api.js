import axios from "axios";


const api = axios.create({
    baseURL: "https://projeto-venda-produtos-back-end-production.up.railway.app/"
});

export default api;