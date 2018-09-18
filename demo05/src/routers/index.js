import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Home from '../components/home';
import UserAdd from '../components/userAdd';
import UserList from '../components/userList';
import UserEdit from '../components/userEdit';
import BookList from '../components/bookList';
import BookAdd from '../components/bookAdd';
import BookEdit from '../components/bookEdit';
import Login from '../components/login';
import HomeLayout from '../layout/homeLayout';

const Init = () =>
  <HashRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <HomeLayout>
        <Route exact path="/" component={Home}/>
        <Route exact path="/user/add" component={UserAdd} />
        <Route exact path="/user/list" component={UserList} />
        <Route exact path="/user/edit/:id" component={UserEdit} />
        <Route exact path="/book/add" component={BookAdd} />
        <Route exact path="/book/list" component={BookList} />
        <Route exact path="/book/edit/:id" component={BookEdit} />
      </HomeLayout>
    </Switch>
  </HashRouter>;

export default Init;