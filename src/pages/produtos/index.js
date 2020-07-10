import React, { useState, useEffect } from 'react';
import Header from '../../components/header';
import { usePage } from '../../context/page';
import { FiPlusCircle, FiTrash2, FiEdit2 } from 'react-icons/fi';
import ProdutoModal from '../../components/produto-modal';
import Spinner from 'react-spinkit';
import {get,remove} from '../../services/product.service';

import { Filtros, Container } from './styles';

export default function Produtos() {

  const [load, setLoad] = useState(false);

  const [produtos, setProdutos] = useState([]);

  const { setPage } = usePage();
  const [modalCreate, setModalCreate] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [editProduct, setEditProduct] = useState({});

  const [search, setSearch] = useState('');
  const [searchOp, setSearchOp] = useState('name');

  const [filteredProducts, setFiltered] = useState([]);

  async function list() {
    setLoad(true);

    try{
      const response = await get();
      setProdutos(response.data);
    }catch(error){
      if(error.response.status === 404){
        
      }else{
        alert('Falha ao listar produtos');
      }
      console.log(error);
    }

    setLoad(false);

  }

  function edit(produto) {
    setEditProduct(produto);
    setModalEdit(true);
  }

  async function remover(id) {
    if(window.confirm('Deseja realmente deletar este produto?')){
      try{
        await remove(id);
        alert('Produto removido com sucesso')
        list();
      }catch(error){
        console.log(error);
        alert('Erro ao editar');
      }
      
    }
  }

  useEffect(() => {
    list();
    setPage('Produtos');
    
  },[setPage]);

  useEffect(()=>{
    setFiltered(produtos);
  },[produtos,setFiltered])

  useEffect(()=>{
    filter();
    //eslint-disable-next-line 
  },[search])

  function filter() {
    switch (searchOp) {
      case 'category':
        setFiltered(produtos.filter(produto => produto.category.name.toLowerCase().includes(search.toLowerCase()) || search === ''))
        break;
      case 'brand':
        setFiltered(produtos.filter(produto => produto.brand.name.toLowerCase().includes(search.toLowerCase()) || search === ''))
        break;
      case 'name':
        setFiltered(produtos.filter(produto => produto.name.toLowerCase().includes(search.toLowerCase()) || search === ''))
        break;
      case 'description':
        setFiltered(produtos.filter(produto => produto.description.toLowerCase().includes(search.toLowerCase()) || search === ''))
        break;
      default : 
        break;
    }
  }

  return (
    <>
      {modalCreate ? <ProdutoModal onClose={() => setModalCreate(false)} loader={() => list()} type={'create'} /> : ''}
      {modalEdit ? <ProdutoModal onClose={() => setModalEdit(false)} loader={() => list()} type={'edit'} produto={editProduct} /> : ''}
      <Header />
      <Filtros>
        <h2>Filtre por :</h2>
        <select onChange={(e) => setSearchOp(e.target.value)}>
          <option value="name" defaultValue>Nome</option>
          <option value="description">Descrição</option>
          <option value="brand">Marca</option>
          <option value="category">Categoria</option>
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
            <button className="add-produto" onClick={() => setModalCreate(true)}>
              <FiPlusCircle className="icon" />
              <h2>Adicionar novo produto</h2>
            </button>

            {filteredProducts.map(produto => (
              <div className="produto" key={produto._id}>

                <div className="title-container">
                  <h2 className="title">{produto.brand ? produto.brand.name : 'Sem marca'} - {produto.name}</h2>
                  <div className="icons">
                    <button onClick={() => remover(produto._id)}>
                      <FiTrash2 color="red" size={18} />
                    </button>
                    <button onClick={() => edit(produto)}>
                      <FiEdit2 color="blue" size={18} />
                    </button>
                  </div>
                </div>

                <p className="description">
                  {produto.description}
                </p>

                <div className="numbers">

                  <div>
                    <h3>Estoque</h3>
                    <p>{produto.stock}</p>
                  </div>

                  <div>
                    <h3>Preço</h3>
                    <p>{produto.price}</p>
                  </div>

                </div>

                <p className="categoria">{produto.category ? produto.category.name : 'Sem categoria'}</p>

              </div>
            ))}
          </>
        }

      </Container>
    </>
  )
}