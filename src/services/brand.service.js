import api from '../api';

export async function create(marca){
  const request = await api.post('/brand',marca,{
    headers : {
      Authorization : `Bearer ${localStorage.getItem('token')}`
    }
  })
  return request;
};

export async function remove(id){
  const request = await api.delete(`/brand/${id}`,{
    headers : {
      Authorization : `Bearer ${localStorage.getItem('token')}`
    }
  })

  return request;
}

export async function edit(marca){
  const request = await api.put(`/brand/${marca._id}`,marca,{
    headers : {
      Authorization : `Bearer ${localStorage.getItem('token')}`
    }
  })

  return request;
}

export async function get(){
  const request = await api.get(`/brand`,{
    headers : {
      Authorization : 'Bearer ' + localStorage.getItem('token')
    }
  })

  return request;
}