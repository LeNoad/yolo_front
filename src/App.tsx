import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './web/Login';
import Status from './web/Status';
import Register from './web/Register';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/status' element={<Status />}/>
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
