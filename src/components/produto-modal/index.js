import React, { useState, useEffect } from 'react'
import Spinner from 'react-spinkit';
import { Wrapper } from './styles';
import { create, edit } from '../../services/product.service';
import { get as getCategorias } from '../../services/category.service';
import { get as getMarcas } from '../../services/brand.service';

export default function ProdutoModal({ onClose = () => { }, type, produto, loader = () => { } }) {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [categorys, setCategorys] = useState([]);
  const [brands, setBrands] = useState([]);

  const [name, setName] = useState(type === 'edit' ? produto.name : '');
  const [description, setDescription] = useState(type === 'edit' ? produto.description : '');
  const [price, setPrice] = useState(type === 'edit' ? produto.price : '');
  const [stock, setStock] = useState(type === 'edit' ? produto.stock : '');
  const [brand, setBrand] = useState(type === 'edit' ? produto.brand : '');
  const [category, setCategory] = useState(type === 'edit' ? produto.category : '');

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);

    
    try {
      await create({name, description, price, stock, brand, category});
      setLoading(false);
      alert('Produto criado   com sucesso');
      onClose();
      loader();
    } catch (error) {
      console.log(error.response)
      if (error.response.status === 400) {
        alert('Falha ao cadastrar produto,confira os dados apresentados.');
        setError(true);
      }
      else {
        alert('Erro ao cadastrar no produto no sistema,tente mais tarde');
      }

      setLoading(false);
    }

  }

  async function handleEdit(e) {
    e.preventDefault();
    setLoading(true);

    produto = {
      _id: produto._id, 
      name, 
      description, 
      price, 
      stock, 
      brand, 
      category
    }

    try {
      await edit(produto);
      setLoading(false);
      alert('Produto atualizado com sucesso');
      onClose();
      loader();
    } catch (error) {
      alert('Falha ao editar produto');
      console.log(error.response);
    }

  }

  async function loadBrands() {

    try {
      const response = await getMarcas();
      setBrands(response.data);
    } catch (error) {
      if(error.response.status === 404){
        
      }else{
        alert('Falha ao carregar marcas');
      }
      console.log(error.response);
    }

  }

  async function loadCategorys() {

    try {
      const response = await getCategorias();
      console.log(response.data);
      setCategorys(response.data);
    } catch (error) {
      if(error.response.status === 404){
        
      }else{
        alert('Falha ao carregar categorias');
      }
      console.log(error.response);
    }

  }

  useEffect(() => {
    loadBrands();
    loadCategorys();
  }, [])

  return (
    <Wrapper error={error.toString()}>
      <form onSubmit={type === 'edit' ? handleEdit : handleRegister}>
        <div className="title">
          <h1>Cadastro de produto</h1>
          <button onClick={onClose}>
            <h2>X</h2>
          </button>
        </div>

        {categorys.length < 1 || brands.length < 1 ? (
          <h1>Nenhuma categoria ou marca encontrada,por favor crie alguma antes de criar um produto</h1>
        ) : (
          <>
            <div className="input-group">
          <label htmlFor="">Nome</label>

          <input
            type="text"
            placeholder="Nome do produto"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

        </div>


        <div className="input-group">
          <label htmlFor="">Descrição</label>

          <textarea
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

        </div>

        <div className="input-group">
          <label htmlFor="">Preço</label>
          <input
            type="number"
            placeholder="Preço "
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="">Estoque</label>
          <input
            type="number"
            placeholder="Quantidade em estoque"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="">Categoria</label>
          <select
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" selected disabled hidden> 
              </option>
            {categorys.map(categoria => (
              <option key={categoria._id} value={categoria._id}>{categoria.name}</option>
            ))} 
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="">Marca</label>
          <select
            onChange={(e) => setBrand(e.target.value)}
            required
          >
             <option value="" selected disabled hidden> 
              </option> 
            {brands.map(marca => (
              <option key={marca._id} value={marca._id}>{marca.name}</option>
            ))}
          </select>
        </div>

        <button type="submit" >
          {!loading
            ? <p>{type === 'edit' ? 'Atualizar' : 'Cadastrar'}</p>
            : <Spinner name="circle" className="icon" fadeIn="none" />
          }
        </button>
          </>
        )}
        
      </form>
    </Wrapper>
  )
}
