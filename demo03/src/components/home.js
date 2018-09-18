import React from 'react';
import { Link } from 'react-router-dom';
import HomeLayout from './homeLayout';

const Home = () =>
  <HomeLayout title="Welcome">
    <Link to="/user/add">添加用户</Link>
    <br />
    <Link to="/user/list">用户列表</Link>
    <br />
    <Link to="/book/add">添加图书</Link>
    <br />
    <Link to="/book/list">图书列表</Link>
  </HomeLayout>;

export default Home;