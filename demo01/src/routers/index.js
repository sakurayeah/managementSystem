import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Home from '../components/home';
import UserAdd from '../components/userAdd';
import UserList from '../components/userList';
import UserEdit from '../components/userEdit';

const Init = () =>
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/user/add" component={UserAdd} />
      <Route exact path="/user/list" component={UserList} />
      <Route exact path="/user/edit/:id" component={UserEdit} />
    </Switch>
  </HashRouter>;

export default Init;