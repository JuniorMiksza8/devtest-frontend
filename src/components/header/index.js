import React from 'react';
import { usePage } from '../../context/page';
import {Link,useHistory} from 'react-router-dom';
import {FiPower} from 'react-icons/fi';
import {Head} from './styled';

export default function Header() {

  const { page } = usePage();
  const history = useHistory();

  const pages = [
    {
      name: 'Produtos',
      to : "/produtos"
    },
    {
      name: 'Categorias',
      to : "/categorias"
    },
    {
      name: 'Marcas',
      to : "/marcas"
    }
  ]

  function logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    history.push('/');
  }

  return (
    <Head>
      <div className="links">
        {pages.map(pagina => (
          <Link key={pagina.name} to={pagina.to} className={`link ${page === pagina.name ? 'selected' : ''}`}>{pagina.name}</Link>
        ))}
      </div>
      <div className="userOps">
        <p>{localStorage.getItem('email')}</p>
        <div className="buttons">
          <button onClick={()=> logout()}>
            <FiPower className="icon" color="red"/>
          </button>
        </div>
      </div>
    </Head>
  )
}