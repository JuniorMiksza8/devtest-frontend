import React, { useState, useEffect } from 'react';
import Header from '../../components/header';
import { usePage } from '../../context/page';
import { FiPlusCircle, FiTrash2, FiEdit2 } from 'react-icons/fi';
import MarcaModal from '../../components/marca-modal';
import Spinner from 'react-spinkit';
import {get,remove} from '../../services/brand.service';

import { Filtros, Container } from './styles';

export default function Marcas() {

  const [load, setLoad] = useState(false);

  const [marcas, setMarcas] = useState([]);

  const { setPage } = usePage();
  const [modalCreate, setModalCreate] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [editBrand, setEditBrand] = useState({});

  const [search, setSearch] = useState('');
  const [searchOp, setSearchOp] = useState('name');

  const [filteredProducts, setFiltered] = useState([]);

  async function list() {
    setLoad(true);

    try{
      const response = await get();
      setMarcas(response.data);
    }catch(error){
      if(error.response.status === 404){
        setMarcas([]);
      }
      console.log(error);
    }

    setLoad(false);

  }

  function edit(marca) {
    setEditBrand(marca);
    setModalEdit(true);
  }

  async function remover(id) {
    if(window.confirm('Deseja realmente deletar esta marca?')){
      try{
        await remove(id);
        alert('marca removida com sucesso')
        list();
      }catch(error){
        console.log(error);
        alert('Erro ao editar');
      }
      
    }
  }

  useEffect(() => {
    list();
    setPage('Marcas');
  },[setPage]);

  useEffect(()=>{
    setFiltered(marcas);
  },[marcas,setFiltered])

  useEffect(()=>{
    filter();
    //eslint-disable-next-line 
  },[search])

  function filter() {
    switch (searchOp) {
      case 'name':
        setFiltered(marcas.filter(marca => marca.name.toLowerCase().includes(search.toLowerCase()) || search === ''))
        break;
      default : 
        break;
    }
  }

  return (
    <>
      {modalCreate ? <MarcaModal onClose={() => setModalCreate(false)} loader={() => list()} type={'create'} /> : ''}
      {modalEdit ? <MarcaModal onClose={() => setModalEdit(false)} loader={() => list()} type={'edit'} marca={editBrand  } /> : ''}
      <Header />
      <Filtros>
        <h2>Filtre por :</h2>
        <select onChange={(e) => setSearchOp(e.target.value)}>
          <option value="name" defaultValue>Nome</option>
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
            <button className="add-marca" onClick={() => setModalCreate(true)}>
              <FiPlusCircle className="icon" />
              <h2>Adicionar nova marca</h2>
            </button>

            {filteredProducts.map(marca => (
              <div className="marca" key={marca._id}>

                <div className="title-container">
                  
                  <div className="icons">
                    <button onClick={() => remover(marca._id)}>
                      <FiTrash2 color="red" size={18} />
                    </button>
                    <button onClick={() => edit(marca)}>
                      <FiEdit2 color="blue" size={18} />
                    </button>
                  </div>
                </div>

                <h2 className="title">{marca.name}</h2>

              </div>
            ))}
          </>
        }

      </Container>
    </>
  )
}