import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Login from './routes/login';
import UserAdd from './routes/userAdd';
import UserList from './routes/userList';
import UserEdit from './routes/userEdit';
import HomeLayout from './layout/homeLayout';
import BookList from './routes/bookList';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" exact component={Login} />
        <HomeLayout>
          <Route path="/" exact component={IndexPage} />
          <Route exact path="/user/add" component={UserAdd} />
          <Route exact path="/user/list" component={UserList} />
          <Route exact path="/user/edit" component={UserEdit} />
          <Route exact path="/book/list" component={BookList} />
        </HomeLayout>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
