import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import {useStore} from '../components/zustand';

const { Header, Content, Footer } = Layout;

const Navbar: React.FC = () => {
  var   username=  useStore(state => state.username)
  
  var loginSuccess = useStore(state => state.loginSuccess)
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="layout">
      <Header >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
        />
        <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
          {loginSuccess?(<text style={{ color: 'white', fontSize: 20 }}>
            Hello {username}!!
          </text>):null}
        </div>
      </Header>
    </Layout>
  );
};

export default Navbar;