import axios from 'axios';

const api = axios.create({
  baseURL : 'https://mikszadevtest.herokuapp.com'
})

export default api;