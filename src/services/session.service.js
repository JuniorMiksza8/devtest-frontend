import api from '../api';

export async function login(email,password){
  const request = await api.get('/session',{
    auth : {
      username : email,
      password : password
    }
  })

  return request;
}

export async function me(){
  const request = await api.get('/me',{
    headers : {
      Authorization : `Bearer ${localStorage.getItem('token')}` 
    }
  })

  return request;
}

export function isAuth(){
  const user = localStorage.getItem('token')
  if(user) return true;
  return false;
}