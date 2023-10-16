import React from 'react'
import {
  BrowserRouter
} from "react-router-dom";
import AddCharityForm from './pages/AddCharityForm';
import Home from './pages/Home';
import SingleView from './pages/SingleView';
import ViewAll from './pages/ViewAll';
import { Layout} from 'antd';
import { Routes, Route } from "react-router-dom";
import SideBar from './components/sideBar';



function App() {
 
const { Content} = Layout;
  return (
    <>
      <BrowserRouter>
        <Layout style={{ minHeight: '100vh' }}>
      <SideBar/>
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