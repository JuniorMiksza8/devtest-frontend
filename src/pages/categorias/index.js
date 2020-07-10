import React, { useState, useEffect } from 'react';
import Header from '../../components/header';
import { usePage } from '../../context/page';
import { FiPlusCircle, FiTrash2, FiEdit2 } from 'react-icons/fi';
import CategoriaModal from '../../components/categoria-modal';
import Spinner from 'react-spinkit';
import {get,remove} from '../../services/category.service';

import { Filtros, Container } from './styles';

export default function Categorias() {

  const [load, setLoad] = useState(false);

  const [categorias, setCategorias] = useState([]);

  const { setPage } = usePage();
  const [modalCreate, setModalCreate] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [editCategory, setEditCategory] = useState({});

  const [search, setSearch] = useState('');
  const [searchOp, setSearchOp] = useState('name');

  const [filteredProducts, setFiltered] = useState([]);

  async function list() {
    setLoad(true);

    try{
      const response = await get();
      setCategorias(response.data);
    }catch(error){
      if(error.response.status === 404){
        setCategorias([]);
      }
      console.log(error);
    }

    setLoad(false);

  }

  function edit(produto) {
    setEditCategory(produto);
    setModalEdit(true);
  }

  async function remover(id) {
    if(window.confirm('Deseja realmente deletar esta categoria? Ao deletar voce perdera todos os produtos que forem relacionados a ela')){
      try{
        await remove(id);
        alert('Categoria removida com sucesso')
        list();
      }catch(error){
        console.log(error);
        alert('Erro ao editar');
      }
      
    }
  }

  useEffect(() => {
    list();
    setPage('Categorias');
  },[setPage]);

  useEffect(()=>{
    setFiltered(categorias);
  },[categorias,setFiltered])

  useEffect(()=>{
    filter();
    //eslint-disable-next-line 
  },[search])

  function filter() {
    switch (searchOp) {
      case 'name':
        setFiltered(categorias.filter(categoria => categoria.name.toLowerCase().includes(search.toLowerCase()) || search === ''))
        break;
      case 'description':
        setFiltered(categorias.filter(categoria => categoria.description.toLowerCase().includes(search.toLowerCase()) || search === ''))
        break;
      default : 
        break;
    }
  }

  return (
    <>
      {modalCreate ? <CategoriaModal onClose={() => setModalCreate(false)} loader={() => list()} type={'create'} /> : ''}
      {modalEdit ? <CategoriaModal onClose={() => setModalEdit(false)} loader={() => list()} type={'edit'} categoria={editCategory  } /> : ''}
      <Header />
      <Filtros>
        <h2>Filtre por :</h2>
        <select onChange={(e) => setSearchOp(e.target.value)}>
          <option value="name" defaultValue>Nome</option>
          <option value="description">Descrição</option>
        </select>
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />

        <p>{filteredProducts.length} registros encontrados</p>
      </Filtros>
      <Container>

        {load
          ?
          <Spinner className="loading" fadeIn="none" width={'500px'} />
          :
          <>
            <button className="add-categoria" onClick={() => setModalCreate(true)}>
              <FiPlusCircle className="icon" />
              <h2>Adicionar nova categoria</h2>
            </button>

            {filteredProducts.map(categoria => (
              <div className="categoria" key={categoria._id}>

                <div className="title-container">
                  <h2 className="title">{categoria.name}</h2>
                  <div className="icons">
                    <button onClick={() => remover(categoria._id)}>
                      <FiTrash2 color="red" size={18} />
                    </button>
                    <button onClick={() => edit(categoria)}>
                      <FiEdit2 color="blue" size={18} />
                    </button>
                  </div>
                </div>

                <p className="description">
                  {categoria.description}
                </p>

              </div>
            ))}
          </>
        }

      </Container>
    </>
  )
}