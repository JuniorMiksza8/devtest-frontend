import React, { useState } from 'react'
import Spinner from 'react-spinkit';
import { Wrapper } from './styles';
import { create, edit } from '../../services/brand.service';

export default function MarcaModal({ onClose = () => { }, type, marca, loader = () => { } }) {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [name, setName] = useState(type === 'edit' ? marca.name : '');

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await create({ name });
      setLoading(false);
      alert('Marca adicionada com sucesso');
      onClose();
      loader();
    } catch (error) {
      console.log(error.response)
      if (error.response.status === 400) {
        alert('Falha ao cadastrar marca,confira os dados apresentados.');
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

    marca = {
      _id: marca._id,
      name
    }

    try {
      await edit(marca);
      setLoading(false);
      alert('Marca atualizadacom sucesso');
      onClose();
      loader();
    } catch (error) {
      alert('Falha ao editar marca');
      console.log(error.response);
    }

  }


  return (
    <Wrapper error={error.toString()}>
      <form onSubmit={type === 'edit' ? handleEdit : handleRegister}>
        <div className="title">
          <h1>Cadastro de marcas</h1>
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
