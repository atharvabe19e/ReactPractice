import React from 'react'
import {
  Link,
} from "react-router-dom";
import { useState } from 'react';
import {
  DesktopOutlined,
  PieChartOutlined,
  LoginOutlined,
  UnorderedListOutlined 
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import logo from '../components/assests/images/logo1.png'


const {Sider} = Layout;

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
  getItem('Login', '/login', <Link to={"/login"}><LoginOutlined /></Link>),
  getItem('Home', '/', <Link to={"/"}><PieChartOutlined /></Link>),
  getItem('Form', '/form', <Link to={"/form"}><DesktopOutlined /></Link>),
  getItem('View', '/viewAll', <Link to={"/viewall"}><UnorderedListOutlined /></Link>)]

  /* getItem('Register', 'sub1', <UserOutlined />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />), */



const SideBar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();


  return (
    <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <img style={{ width:collapsed? 80:200, padding:collapsed?3:9,transition: 'width 0.2s ease-in-out, padding 0.5s ease-in-out'}} src={logo} alt="react logo" />
        <div className="demo-logo-vertical" />
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={({key})=>{}}/>
      </Sider>
  );
};

export default SideBar;