import md5 from 'md5';
import axios from '../utils/request';

export let adminList = [
  {
    id:1,
    loginId:'admin',
    loginPwd:'123456',
    name:'管理员',
    phone:'13210001000',
    photo:'/src/',
    roleId:'1',
    role:{
      roleName:'系统管理员'
    }
  },
  {
    id:2,
    loginId:'test1',
    loginPwd:'111222',
    name:'普通成员1',
    phone:'15977778888',
    photo:'/src/',
    roleId:'2'
  },
  {
    id:3,
    loginId:'test2',
    loginPwd:'111222',
    name:'普通成员2',
    phone:'15977778888',
    photo:'/src/',
    roleId:'2'
  },
  {
    id:4,
    loginId:'test3',
    loginPwd:'111222',
    name:'普通成员3',
    phone:'15977778888',
    photo:'/src/',
    roleId:'2'
  },
  {
    id:5,
    loginId:'test4',
    loginPwd:'111222',
    name:'普通成员4',
    phone:'15977778888',
    photo:'/src/',
    roleId:'2'
  },
  {
    id:6,
    loginId:'test5',
    loginPwd:'111222',
    name:'普通成员5',
    phone:'15977778888',
    photo:'/src/',
    roleId:'2'
  },
  {
    id:7,
    loginId:'test6',
    loginPwd:'111222',
    name:'普通成员6',
    phone:'15977778888',
    photo:'/src/',
    roleId:'2'
  },
  {
    id:8,
    loginId:'test7',
    loginPwd:'111222',
    name:'普通成员7',
    phone:'15977778888',
    photo:'/src/',
    roleId:'2'
  },
  {
    id:9,
    loginId:'test8',
    loginPwd:'111222',
    name:'普通成员7',
    phone:'15977778888',
    photo:'/src/',
    roleId:'2'
  }
]

// 登陆方法
export const $login = async (params) => {
  if (params.loginPwd === '123456' && params.loginId === 'admin'){
    const token = md5(params.loginPwd)
    sessionStorage.setItem('token', token)
    return {
      "message": "登陆成功",
      "code": 200,
      token
    }
  }else{
    return {
      "message": "账号密码错误",
      "code": 500,
      "token": ''
    }
  }
}

// 账户列表
export const $list = async (params) => {
  // let {data} = await axios.get('Admin/List',{params})
  let {pageSize, pageIndex} = params 
  return {
    code:200,
    msg:'获取账户列表成功',
    count:adminList.length,
    data:adminList.slice(pageIndex>1?(pageIndex-1)*pageSize:0,pageIndex*pageSize),
    pageIndex:1,
    pageSize:10
  }
}

export const $add = async (params) => {
  // let {data} = await axios.post('Admin/Add',params)
  const obj = {...params, id:adminList.length+1}
  adminList = [...adminList, obj]
  return {
    code:200,
    msg:'添加账号成功',
    data:adminList
  }
}

export const $getOne = async (loginId) => {
  const data = adminList.filter((cur) => {return cur.loginId===loginId})[0]
  return {
    code:200,
    msg:'获取账号信息成功',
    data
  }
}

// 编辑账号
export const update = async (params) => {

}

// 删除账号
export const $del = async (loginId) => {
  adminList = adminList.filter((cur) => {return cur.loginId !== loginId;})
  return {
    code:200,
    msg:'删除账号成功',
  }
}

// 编辑密码
export const $resetPwd =  async (params) => {
  let {id, OldloginPwd, NewloginPwd} = params
  adminList.map((cur) => {
    if(cur.id ===id && OldloginPwd === cur.loginPwd){
      cur.loginPwd=NewloginPwd
    }
  })
  return {code:200,msg:'修改密码成功'}
}
