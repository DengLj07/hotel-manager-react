import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { loginAdmin } from './redux';
import { $getOne } from './api/adminApi';
import Login from "./views/Login";
import Layout from "./views/Layout";
import Role from './views/Role';
import Admin from './views/Admin';
import Mine from './views/Admin/Mine';
import UpdatePwd from './views/Admin/UpdatePwd';


export default function App() {
  const dispatch = useDispatch()
  let {setAdmin} = loginAdmin.actions
  // 判断是否登陆状态
  useEffect(() => {
    if(sessionStorage.getItem('loginId')){
      // 获取登陆账号
      let loginId = sessionStorage.getItem('loginId')
      // 根据登陆名获取账号信息
      $getOne(loginId).then(({data}) => {
        dispatch(setAdmin(data))
      })
      }
  })
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/layout' element={<Layout />}>
          <Route path='role' element={<Role/>}/>
          <Route path='admin' element={<Admin/>}/>
          <Route path='mine' element={<Mine/>}/>
          <Route path='pwd' element={<UpdatePwd/>}/>
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

