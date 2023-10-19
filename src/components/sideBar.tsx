import React from 'react'
import {
  Link,
} from "react-router-dom";
import { useState, useEffect } from 'react';
import {
  DesktopOutlined,
  PieChartOutlined,
  LoginOutlined,
  UnorderedListOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import logo from '../components/assests/images/logo1.png'


const { Sider } = Layout;

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



const SideBar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [scrolloffset, setScrolloffset] = useState(window.scrollY);

  useEffect(() => {
    const handleScroll = () => {
      setScrolloffset(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  { console.log(scrolloffset) }
  return (
    <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} style={{ paddingTop: scrolloffset,position:'relative' }} >
      <img style={{ width: collapsed ? 80 : 200, padding: collapsed ? 3 : 9, transition: 'width 0.2s ease-in-out, padding 0.5s ease-in-out' }} src={logo} alt="react logo" />
      <div className="demo-logo-vertical" />

      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
    </Sider>

  );
};

export default SideBar;