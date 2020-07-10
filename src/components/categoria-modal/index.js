import React, { useState } from 'react'
import Spinner from 'react-spinkit';
import { Wrapper } from './styles';
import { create, edit } from '../../services/category.service';

export default function CategoriaModal({ onClose = () => { }, type, categoria, loader = () => { } }) {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [name, setName] = useState(type === 'edit' ? categoria.name : '');
  const [description, setDescription] = useState(type === 'edit' ? categoria.description : '');

  async function handleCreate(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await create({ name, description});
      setLoading(false);
      alert('categoria criada com sucesso');
      onClose();
      loader();
    } catch (error) {
      console.log(error.response)
      if (error.response.status === 400) {
        alert('Falha ao cadastrar categoria,confira os dados apresentados.');
        setError(true);
      }
      else {
        alert('Erro ao cadastrar no categoria no sistema,tente mais tarde');
      }

      setLoading(false);
    }

  }

  async function handleEdit(e) {
    e.preventDefault();
    setLoading(true);

    categoria = {
      _id: categoria._id,
      name,
      description
    }

    try {
      await edit(categoria);
      setLoading(false);
      alert('categoria atualizada com sucesso');
      onClose();
      loader();
    } catch (error) {
      alert('Falha ao editar categoria');
      console.log(error.response);
    }

  }


  return (
    <Wrapper error={error.toString()}>
      <form onSubmit={type === 'edit' ? handleEdit : handleCreate}>
        <div className="title">
          <h1>Cadastro de categoria</h1>
          <button onClick={onClose}>
            <h2>X</h2>
          </button>
        </div>

        <div className="input-group">
          <label htmlFor="">Nome</label>

          <input
            type="text"
            placeholder="Nome da categoria"
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



        <button type="submit" >
          {!loading
            ? <p>{type === 'edit' ? 'Atualizar' : 'Cadastrar'}</p>
            : <Spinner name="circle" className="icon" fadeIn="none" />
          }
        </button>
      </form>
    </Wrapper>
  )
}
