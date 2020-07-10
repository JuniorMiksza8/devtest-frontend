import React, { useState } from 'react';
import { Container } from './styles';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { login } from '../../services/session.service';

import Spinner from 'react-spinkit';
export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    try{
      const res = await login(email, password);
      setLoading(false);
      alert('Usuario logado');
      localStorage.setItem('token',res.data.token);
      localStorage.setItem('email',res.data.user.email);
      history.push('/produtos');
    }catch(error){
  
      if(error.response.status === 404){
        setLoading(false);
        console.log(error);
        alert('Usuario não encontrado');
      }else{
        setLoading(false);
        console.log(error);
        alert('Falha ao autenticar usuario no sistema,tente mais tarde');
      }
    }
    
  }

  
  
  return (
    <>
      <Container>
        <form onSubmit={handleLogin}>

          <h1>Login</h1>

          <div className="input-group">
            <label htmlFor="">email</label>

            <input
              type="email"
              placeholder="Seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

          </div>

          <div className="input-group">
            <label htmlFor="">senha</label>
            <input
              type="password"
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Link className="register" to="/register">
            <FiArrowLeft className="icon" />
            Não possui conta?
          </Link>

          <button type="submit" >
            {!loading
              ? <p>Entrar</p>
              : <Spinner name="circle" className="icon" fadeIn="none" />
            }
          </button>

        </form>
      </Container>
    </>
  )
}