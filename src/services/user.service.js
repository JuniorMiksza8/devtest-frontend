import api from '../api';

export async function register(user){
  const request = await api.post('/user',user);

  return request;
}