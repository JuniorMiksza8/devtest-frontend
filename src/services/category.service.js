import api from '../api';

export async function create(categoria){
  const request = await api.post('/category',categoria,{
    headers : {
      Authorization : `Bearer ${localStorage.getItem('token')}`
    }
  })
  return request;
};

export async function remove(id){
  const request = await api.delete(`/category/${id}`,{
    headers : {
      Authorization : `Bearer ${localStorage.getItem('token')}`
    }
  })

  return request;
}

export async function edit(categoria){
  const request = await api.put(`/category/${categoria._id}`,categoria,{
    headers : {
      Authorization : `Bearer ${localStorage.getItem('token')}`
    }
  })

  return request;
}

export async function get(){
  const request = await api.get(`/category`,{
    headers : {
      Authorization : 'Bearer ' + localStorage.getItem('token')
    }
  })

  return request;
}