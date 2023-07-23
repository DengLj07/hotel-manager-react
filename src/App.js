import React, { Component } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from "./views/Login";
import Layout from "./views/Layout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/layout' element={<Layout />} />
      </Routes>
    </BrowserRouter>

  )
}

