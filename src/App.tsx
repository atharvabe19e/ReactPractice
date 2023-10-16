import React from 'react'
import Navbar from './components/navbar'
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
  Link,
  BrowserRouter
} from "react-router-dom";
import AddCharityForm from './pages/AddCharityForm';
import Home from './pages/Home';
import SingleView from './pages/SingleView';
import ViewAll from './pages/ViewAll';
import { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import logo from '../src/components/assests/images/logo1.png'
import { Routes, Route } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}


const items: MenuItem[] = [
  getItem('Home', '/', <Link to={"/"}><PieChartOutlined /></Link>),
  getItem('Form', '/form', <Link to={"/form"}><DesktopOutlined /></Link>),
  getItem('List All', '/viewAll', <Link to={"/viewall"}><DesktopOutlined /></Link>),];

  /* getItem('Register', 'sub1', <UserOutlined />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />), */



function App() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <BrowserRouter>
        <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <img style={{ width:collapsed? 80:200, padding:collapsed?3:9,paddingRight:0,transition: 'width 0.2s ease-in-out, padding 0.5s ease-in-out'}} src={logo} alt="react logo" />
        <div className="demo-logo-vertical" />
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={({key})=>{}}/>
      </Sider>
      <Content>
      <Routes>
        <Route path='/' element={<Home/>}/>
         <Route path= '/post' element= {<SingleView />}/>
         <Route path= '/form' element= {<AddCharityForm />}/>
         <Route path= '/viewall' element= {<ViewAll />}/>
      </Routes>
      </Content>
        </Layout>
      </BrowserRouter>
    </>
  )
}

export default App