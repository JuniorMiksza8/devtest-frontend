import React from 'react';
import { BrowserRouter, Route, Switch,Redirect } from 'react-router-dom';
import PageProvider from './context/page';
import {isAuth} from './services/session.service';

import Login from './pages/login';
import Register from './pages/register';
import Produtos from './pages/produtos';
import Categorias from './pages/categorias';
import Marcas from './pages/marcas';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props =>(
      isAuth() ?
        <Component {...props} />
        : <Redirect to="/" />
    )} />
  );
};  

export default function Routes() {
  return (

    <BrowserRouter>
      <PageProvider>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRoute path="/produtos" component={Produtos} />
          <PrivateRoute path="/categorias" component={Categorias} />
          <PrivateRoute path="/marcas" component={Marcas} />
        </Switch>
      </PageProvider>
    </BrowserRouter>
  

  )
}