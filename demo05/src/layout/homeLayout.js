import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import './homeLayout.less';

const { SubMenu, Item } = Menu;

class HomeLayout extends React.Component {
  render () {
    const {title = '', children = '', className = ''} = this.props;
    return (
      <div className="home-layout-wrap">
        <header>
          <Link to="/">ReactManager</Link>
        </header>

        <main>
          <div className="menu-list">
            <Menu mode="inline" theme="dark" style={{width: '240px'}}>
              <SubMenu key="user" title={<span><Icon type="user"/><span>用户管理</span></span>}>
                <Item key="user-list">
                  <Link to="/user/list">用户列表</Link>
                </Item>
                <Item key="user-add">
                  <Link to="/user/add">添加用户</Link>
                </Item>
              </SubMenu>
              <SubMenu key="book" title={<span><Icon type="book"/><span>图书管理</span></span>}>
                <Item key="book-list">
                  <Link to="/book/list">图书列表</Link>
                </Item>
                <Item key="book-add">
                  <Link to="/book/add">添加图书</Link>
                </Item>
              </SubMenu>
            </Menu>
          </div>

          <div className="content">
            {children}
          </div>
        </main>
        
      </div>
    );
  }
}

export default HomeLayout;