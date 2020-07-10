import React,{useState} from 'react';
import { Container } from './styles';
import { FiArrowLeft } from 'react-icons/fi';
import {Link,useHistory} from 'react-router-dom';
import Spinner from 'react-spinkit';
import {register} from '../../services/user.service';

export default function Register() {

  const history = useHistory();

  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const [loading,setLoading] = useState(false);

  async function handleRegister(e){
    e.preventDefault();
    setLoading(true);

    try{  
      await register({name,email,password});
      setLoading(false);
      alert('Usuario criado com sucesso');
      history.push('/');
    }catch(error){
      if(error.response.status === 400){
        console.log(error.response.data.error);
        alert('Usuario já cadastrado no sistema')
        setLoading(false);
      }else{
        setLoading(false);
        alert('Falha ao criar usuario');
      }   
    }

  }

  return (
    <>
      <Container>
        <form onSubmit={handleRegister}>

          <h1>Cadastro</h1>

          <div className="input-group">
            <label htmlFor="">nome</label>

            <input
              type="text"
              placeholder="Seu nome"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              required
            />

          </div>


          <div className="input-group">
            <label htmlFor="">email</label>

            <input
              type="email"
              placeholder="Seu email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
            />

          </div>

          <div className="input-group">
            <label htmlFor="">senha</label>
            <input
              type="password"
              placeholder="Sua senha"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
            />
          </div>

          <Link className="register" to="/">
            <FiArrowLeft className="icon" />
            ja possui conta?
          </Link>

          <button type="submit" >
            {!loading 
            ? <p>Cadastrar</p>             
            : <Spinner name="circle" className="icon" fadeIn="none"/>
            }
          </button>

        </form>
      </Container>
    </>
  )
}