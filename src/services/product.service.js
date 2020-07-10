import api from '../api';

export async function create(produto){
  const request = await api.post('/product',produto,{
    headers : {
      Authorization : `Bearer ${localStorage.getItem('token')}`
    }
  })
  return request;
};

export async function remove(id){
  const request = await api.delete(`/product/${id}`,{
    headers : {
      Authorization : `Bearer ${localStorage.getItem('token')}`
    }
  })

  return request;
}

export async function edit(produto){
  const request = await api.put(`/product/${produto._id}`,produto,{
    headers : {
      Authorization : `Bearer ${localStorage.getItem('token')}`
    }
  })

  return request;
}

export async function get(){
  const request = await api.get(`/product`,{
    headers : {
      Authorization : 'Bearer ' + localStorage.getItem('token')
    }
  })

  return request;
}