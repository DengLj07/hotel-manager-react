import React from 'react'
import { useSelector } from 'react-redux'


export default function Mine() {
  // 获取登陆信息子模块
  const loginAdmin = useSelector(state=>state.loginAdmin)
  const {admin} = loginAdmin
  return (
    <div style={{display:'flex'}}>
      <img style={{width:'200px'}} src='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F3a2f9e13-ac28-467f-8ccc-e024f5e81c0a%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1693905223&t=79a403b2525fc7cc7bb04d69d95ab52f'/>
      <div style={{marginLeft:'10px', fontSize:'20px'}}>
        <p>账号:{admin.loginId}</p>
        <p>姓名:{admin.name}</p>
        <p>电话:{admin.phone}</p>
        <p>角色:{admin.role?.roleName}</p>
      </div>
    </div>
  )
}
