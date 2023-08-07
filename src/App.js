import React, { Component } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from "./views/Login";
import Layout from "./views/Layout";
import Role from './views/Role';
import Admin from './views/Admin';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/layout' element={<Layout />}>
          <Route path='role' element={<Role/>}/>
          <Route path='admin' element={<Admin/>}/>
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

