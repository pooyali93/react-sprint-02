import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Layout from './components/layouts/Layout.js';
import MyBookings from './components/pages/MyBookings.js';
import Login from './components/pages/Login.js';
import PageNotFound from './components/pages/404.js'

import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<MyBookings/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/*' element={<PageNotFound/>}></Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}


